import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'typeorm';
import { Movie } from './movie.model';
import { MoviesService } from './movies.service';
import { ConflictException, NotFoundException } from "@nestjs/common";
import { OmdbService } from '../omdb/omdb.service';

describe('MoviesService', () => {
  let service: MoviesService
  let connection
  let omdbService: OmdbService

  const mockQueryRunner = {
    connect: jest.fn(),
    startTransaction: jest.fn(),
    rollbackTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    release: jest.fn(),
    manager: {
      find: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
    }
  }

  const fakeMovie = {
    Title: 'Title',
    Director: 'director',
    Plot: 'plot',
    Year: 1998,
    Actors: 'Jason Statham',
    Response: true
  }
  
  const mockRepo = {
    find: jest.fn(),
    findOne: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService, 
        {
          provide: Connection,
          useFactory:  () => ({
            createQueryRunner: jest.fn(),
            getRepository: jest.fn()
          })
        },
        {
          provide: OmdbService,
          useValue: {
            fetchMovie: jest.fn()
          }
        }
      ]
    }).compile();
    
      service = module.get<MoviesService>(MoviesService);
      omdbService = module.get<OmdbService>(OmdbService)
      connection = module.get<Connection>(Connection)
      connection.createQueryRunner.mockImplementation(() => {
        return mockQueryRunner
      });
      connection.getRepository.mockImplementation(() => {
        return mockRepo
      })
  });

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should throw ConflictException when movie found in db', async () => {
    jest.spyOn(omdbService, 'fetchMovie').mockResolvedValue(fakeMovie);
    const findSpy = jest.spyOn(mockQueryRunner.manager, 'findOne')
    
    mockQueryRunner.manager.findOne.mockReturnValue('db value')

    let error: any
    try {
      await service.create({title: fakeMovie.Title, year: 1998})
    } catch (err) {
      error = err
    }

    expect(error).not.toBeUndefined()
    expect(error).toBeInstanceOf(ConflictException)
    expect(error.message).toBe('Movie already exists in Database')

    expect(findSpy).toBeCalledWith(Movie, {  
      where: { title: fakeMovie.Title } 
    })
  })
  it('should fetch movie and save in Database', async () => {
    mockQueryRunner.manager.findOne.mockReturnValue(undefined)
    jest.spyOn(omdbService, 'fetchMovie').mockResolvedValue(fakeMovie);


    const saveSpy = jest.spyOn(mockQueryRunner.manager, 'save')

    await service.create({title: 'Title', year: 1998})

    expect(saveSpy).toBeCalledWith(new Movie({
      title: fakeMovie.Title,
      director: fakeMovie.Director,
      plot: fakeMovie.Plot,
      year: fakeMovie.Year,
      actors: fakeMovie.Actors
    }))
  })
  it('should return all movies saved in Database', async () => {
    const fakeFind = jest.spyOn(mockRepo, 'find').mockResolvedValue([{id: '1'}, {id: '2'}])
    const actual = await service.findAll()
    expect(fakeFind).toBeCalledWith({ select: ['id'] })
    expect(actual).toStrictEqual(['1', '2'])
  })
  describe('find', () => {
    it('should throw NotFoundException', async () => {
      jest.spyOn(mockRepo, 'findOne').mockResolvedValue(undefined)
      let error: any
      try {
        await service.find('uuid')
      } catch (e) {
        error = e
      }
      expect(error).not.toBeUndefined()
      expect(error).toBeInstanceOf(NotFoundException)
    })
    it('should returned movie from db', async () => {
      const fakeMovie ={test: 'test'} as unknown as Movie
      const fakeFind = jest.spyOn(mockRepo, 'findOne').mockResolvedValue(fakeMovie)
      const actual = await service.find('uuid')

      expect(actual).toBe(fakeMovie)
      expect(fakeFind).toBeCalledWith('uuid', {relations: ["comments"]})
    })
  })
});

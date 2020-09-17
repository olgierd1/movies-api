import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'typeorm';
import { Movie } from './movie.model';
import { MoviesService } from './movies.service';
import { ConflictException, HttpModule, HttpService } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { MovieSerializerService } from './movie.serializer';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { CreateMovieDto } from './dto/create.movie.dto';

describe('MoviesService', () => {
  let service: MoviesService
  let connection
  let httpService: HttpService
  let configService: ConfigService



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
    title: 'Title',
    director: 'director',
    Response: true
  }
  const mockRepo = {
    find: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
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
          provide: ConfigService,
          useValue: {
            get: jest.fn()
          }
        }, {
          provide: MovieSerializerService,
          useValue: {
            convertToEntity: (args: any) => args
          }
        }
      ]
    }).compile();
    
      service = module.get<MoviesService>(MoviesService);
      httpService = module.get<HttpService>(HttpService);
      configService = module.get<ConfigService>(ConfigService)
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

  it(`should throw ConflictException when customer found in db`, async () => {
    jest.spyOn(httpService, 'get').mockImplementation(() => of({
      data: fakeMovie
    } as AxiosResponse));
    jest.spyOn(configService, 'get').mockImplementation((): any => 'TEST') 
    const findSpy = jest.spyOn(mockQueryRunner.manager, 'findOne')
    
    mockQueryRunner.manager.findOne.mockReturnValue('db value')

    let error: any
    try {
      await service.create({title: fakeMovie.title, year: '1998'})
    } catch (err) {
      error = err
    }
    expect(error).not.toBeUndefined()
    expect(error).toBeInstanceOf(ConflictException)

    expect(findSpy).toBeCalledWith(Movie, {  
      where: { title: fakeMovie.title } 
    })
  })
  it('should fetch movie and save in Database', async () => {
    const movie = {
      id: 1,
      title: 'Title',
      director: 'Director',
      year: '123',
    }
    mockQueryRunner.manager.findOne.mockReturnValue(undefined)
    jest.spyOn(httpService, 'get').mockImplementation(() => of({
      data: {Response: true, ...movie}
    } as AxiosResponse));

    const saveSpy = jest.spyOn(mockQueryRunner.manager, 'save')

    await service.create(movie as CreateMovieDto)

    const { Response, ...rest } = saveSpy.mock.calls[0][0]
    expect(rest).toEqual(new Movie(movie))
  })
  it('should return all movies saved in Database', async () => {
    const fakeFind = jest.spyOn(mockRepo, 'find')
    await service.findAll()

    expect(fakeFind).toBeCalled()
  })
});

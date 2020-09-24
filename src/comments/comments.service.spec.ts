import { Test, TestingModule } from '@nestjs/testing'
import { Connection } from 'typeorm'
import { Movie } from '../movies/movie.model'
import { HttpModule, NotFoundException } from "@nestjs/common"
import { CommentsService } from './comments.service'
import { Comment } from './comment.model'

describe('CommentsService', () => {
  let service: CommentsService
  let connection

  const fakeComment = {
    movieTitle: 'Title',
    text: 'text',
    author: 'author'
  }

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

  const mockRepo = {
    find: jest.fn(),
    findOne: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        CommentsService, 
        {
          provide: Connection,
          useFactory:  () => ({
            createQueryRunner: jest.fn(),
            getRepository: jest.fn()
          })
        }
      ]
    }).compile()
    
      service = module.get<CommentsService>(CommentsService)
      connection = module.get<Connection>(Connection)
      connection.createQueryRunner.mockImplementation(() => {
        return mockQueryRunner
      })
      connection.getRepository.mockImplementation(() => {
        return mockRepo
      })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it(`should throw NotFoundException when movie does not exists in Database`, async () => {

    const findSpy = jest.spyOn(mockQueryRunner.manager, 'findOne')
    
    mockQueryRunner.manager.findOne.mockReturnValue(undefined)

    let error: any
    try {
      await service.create(fakeComment)
    } catch (err) {
      error = err
    }
    expect(error).not.toBeUndefined()
    expect(error).toBeInstanceOf(NotFoundException)

    expect(findSpy).toBeCalledWith(Movie, {  
      where: { title: fakeComment.movieTitle } 
    })
  })

  it('should save comment with properly assigned movie', async () => {
    const movie = {title: fakeComment.movieTitle} as Movie
    const saveSpy = jest.spyOn(mockQueryRunner.manager, 'save')
    jest.spyOn(mockQueryRunner.manager, 'findOne').mockReturnValue(movie)
    mockQueryRunner.manager.findOne.mockReturnValue(movie)

    await service.create(fakeComment)

    expect(saveSpy).toBeCalledWith(new Comment({
      text: fakeComment.text,
      author: fakeComment.author,
      movie
    }))
  })

  it('should return all comments with assigned movie titles', async () => {
    const fakeFind = jest.spyOn(mockRepo, 'find').mockReturnValue([{id: 'a'}, {id: 'b'}])
    const actual = await service.findAll()

    expect(fakeFind).toBeCalledWith({ select: ['id'] })
    expect(actual).toStrictEqual(['a','b'])
  })

  describe('find', () => {
    it('should throw NotFoundException', async () => {
      const fakeFind = jest.spyOn(mockRepo, 'findOne').mockReturnValue(undefined)
      let error
      try {
        await service.find('a')
      } catch (e) {
        error = e        
      }

      expect(error).not.toBeUndefined()
      expect(error).toBeInstanceOf(NotFoundException)
    })
    it('should return comment', async () => {
      const fakeFind = jest.spyOn(mockRepo, 'findOne').mockResolvedValue(fakeComment as unknown as Comment)
      const actual = await service.find('a')

      expect(actual).toBe(fakeComment)
      expect(fakeFind).toBeCalledWith('a')
    })
  })
})

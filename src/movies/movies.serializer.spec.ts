import { TestingModule, Test } from '@nestjs/testing';
import { CommentsSerializerService } from '../comments/comment.serializer';
import TestUtils from '../../test/test.utils'
import { Movie } from './movie.model';
import { MovieSerializerService } from './movie.serializer';

const randomMovie = () => {
  return {
    id: 'aaa',
    title: TestUtils.random(),
    director: TestUtils.random(),
    actors: TestUtils.random(),
    plot: TestUtils.random(),
    year: 1,
    comments: [{
      id: TestUtils.random(),
      text: TestUtils.random(),
      author: TestUtils.random()
    }]
  } as Movie
}
describe('MoviesSerializerService', () => {
  let serializer : MovieSerializerService
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieSerializerService,
        {
          provide: CommentsSerializerService,
          useValue: {
            serializeCollection: (args) => args
          }
        }
      ]
    })
    .compile();
    serializer = module.get<MovieSerializerService>(MovieSerializerService);
  });
  
  it('should serialize', () => {
    const movie = randomMovie()
    const actual = serializer.serialize(movie)

    expect(actual).toMatchObject({
      id: movie.id,
      title: movie.title,
      director: movie.director,
      actors: movie.actors,
      plot: movie.plot,
      year: movie.year,
      comments: movie.comments
    });
  });
})
import { TestingModule, Test } from '@nestjs/testing';
import TestUtils from '../../test/test.utils'
import { Movie } from './movie.model';
import { MovieSerializerService, BareMovie } from './movie.serializer';

const randomMovie = () => {
  return {
    id: 1,
    title: TestUtils.random(),
    director: TestUtils.random(),
    actors: TestUtils.random(),
    plot: TestUtils.random(),
    year: TestUtils.random()
  } as Movie
}

const bareRandomMovie = () => {
  return {
    Title: TestUtils.random(),
    Director: TestUtils.random(),
    Actors: TestUtils.random(),
    Plot: TestUtils.random(),
    Year: TestUtils.random()
  } as BareMovie
}
describe('MoviesSerializerService', () => {
  let serializer : MovieSerializerService
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieSerializerService
      ]
    })
    .compile();
    serializer = module.get<MovieSerializerService>(MovieSerializerService);
  });
  
  it('should serialize movie', () => {
    const movie = randomMovie()
    const actual = serializer.serialize(movie)
    const { id, ...rest } = movie

    expect(actual).toMatchObject(rest);
  });

  it('should convert to Entity', () => {
    const bareMovie = bareRandomMovie()
    const actual = serializer.convertToEntity(bareMovie)
    const expected = {
      title: bareMovie.Title,
      director: bareMovie.Director,
      actors: bareMovie.Actors,
      plot: bareMovie.Plot,
      year: bareMovie.Year
    }
    expect(actual).toMatchObject(expected)
  })
})
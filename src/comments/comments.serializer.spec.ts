import { TestingModule, Test } from '@nestjs/testing';
import TestUtils from '../../test/test.utils'
import { Comment } from './comment.model';
import { Movie } from '../movies/movie.model';
import { CommentsSerializerService } from './comment.serializer';

const randomComment = () => {
  return {
    id: TestUtils.random(),
    text: TestUtils.random(),
    author: TestUtils.random(),
    movie: {} as Movie
  } as Comment
}
describe('CommentsSerializerService', () => {
  let serializer : CommentsSerializerService
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsSerializerService
      ]
    })
    .compile();
    serializer = module.get<CommentsSerializerService>(CommentsSerializerService);
  });
  
  it('should serialize comment', () => {
    const comment = randomComment()
    const actual = serializer.serialize(comment)
    
    expect(actual).toMatchObject({
      id: comment.id,
      text: comment.text,
      author: comment.author
    });
  });
})
import { TestingModule, Test } from '@nestjs/testing';
import TestUtils from '../../test/test.utils'
import { Comment } from './comment.model';
import { CommentsSerializerService } from './comment.serializer';

const randomComment = () => {
  return {
    id: 1,
    text: TestUtils.random(),
    author: TestUtils.random()
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
    const { id, ...rest } = comment

    expect(actual).toMatchObject(rest);
  });
})
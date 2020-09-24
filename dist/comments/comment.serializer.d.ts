import { BaseSerializerService } from "../serialize/base.serializer";
import { Comment } from "./comment.model";
import { CommentDto } from "./dto/comment.dto";
export declare class CommentsSerializerService extends BaseSerializerService<Comment, CommentDto> {
    constructor();
    serialize(entity: Comment): CommentDto;
}

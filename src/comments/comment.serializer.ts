import { Injectable } from "@nestjs/common"
import { BaseSerializerService } from "../serialize/base.serializer"
import { Comment } from "./comment.model"
import { CommentDto } from "./dto/comment.dto"

@Injectable()
export class CommentsSerializerService extends BaseSerializerService<Comment, CommentDto> {
  constructor() {
    super()
  }
  
  public serialize(entity: Comment): CommentDto {
    return {
      id: entity.id,
      text: entity.text,
      author: entity.author
    }
  }
} 
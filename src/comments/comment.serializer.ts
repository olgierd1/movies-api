import { Injectable } from "@nestjs/common"
import { Movie } from "src/movies/movie.model"
import { BaseSerializerService } from "../serialize/base.serializer"
import { Comment } from "./comment.model"
import { CommentDto, MovieCommentsDto } from "./dto/comment.dto"

@Injectable()
export class CommentsSerializerService extends BaseSerializerService<Comment, CommentDto> {
  constructor() {
    super()
  }
  
  public serialize(entity: Comment): CommentDto {
    return {
      text: entity.text,
      author: entity.author
    }
  }
} 

@Injectable()
export class MovieCommentsSerializerService extends BaseSerializerService<Movie, MovieCommentsDto> {
  constructor(
    private readonly commentsSerializerService: CommentsSerializerService) {
    super()
  }
  
  public serialize(entity: Movie): MovieCommentsDto {
      return {
        title: entity.title,
        comments: this.commentsSerializerService.serializeCollection(entity.comments)
      }
  }
}
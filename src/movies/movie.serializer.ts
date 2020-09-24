import { Injectable } from "@nestjs/common";
import { BaseSerializerService } from "../serialize/base.serializer";
import { Movie } from "./movie.model";
import { MovieDto } from "./dto/movie.dto";
import { CommentsSerializerService } from "../comments/comment.serializer";

@Injectable()
export class MovieSerializerService extends BaseSerializerService<Movie, MovieDto> {
  constructor(private readonly commentsSerializerService: CommentsSerializerService) {
    super();
  }

 public serialize(entity: Movie): MovieDto {
   return {
     id: entity.id,
     title: entity.title,
     director: entity.director,
     actors: entity.actors,
     plot: entity.plot,
     year: entity.year,
     ...(entity.comments && {comments: this.commentsSerializerService.serializeCollection(entity.comments)})
   }
 }
}
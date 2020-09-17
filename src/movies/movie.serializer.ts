import { Injectable } from "@nestjs/common";
import { BaseSerializerService } from "../serialize/base.serializer";
import { Movie } from "./movie.model";
import { MovieDto } from "./dto/movie.dto";
import { PureMovie } from "./movies.service";

@Injectable()
export class MovieSerializerService extends BaseSerializerService<Movie, MovieDto> {

 public serialize(entity: Movie): MovieDto {
   return {
     title: entity.title,
     director: entity.director,
     actors: entity.actors,
     plot: entity.plot,
     year: entity.year
   }
 }
  
  // TODO: think about better name
  public convertToEntity(movie: PureMovie): MovieDto {
    return {
      title: movie.Title,
      director: movie.Director,
      actors: movie.Actors,
      plot: movie.Plot,
      year: movie.Year
    }
  }

  constructor() {
   super();
 }
}
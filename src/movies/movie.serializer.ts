import { Injectable } from "@nestjs/common";
import { BaseSerializerService } from "../serialize/base.serializer";
import { Movie } from "./movie.model";
import { MovieDto } from "./dto/movie.dto";

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
  
  public convertToEntity(movie: BareMovie): MovieDto {
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


export interface BareMovie {
  Title: string
  Year: string
  Actors: string
  Director: string
  Plot: string
}
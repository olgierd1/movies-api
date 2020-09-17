import { Controller, Get, Post } from '@nestjs/common';
import { CreateMovieDto } from './dto/create.movie.dto';
import { MoviesService } from './movies.service';
import { ReqMovie } from './movie.decorator';
import { MovieSerializerService } from './movie.serializer';
import { MovieDto } from './dto/movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(
  private readonly moviesService: MoviesService,
  private readonly movieSerializer: MovieSerializerService) { }
  
  @Post()
  create(@ReqMovie() movie: CreateMovieDto): Promise<void>  {
    return this.moviesService.create(movie)
  }

  @Get()
  async findAll(): Promise<MovieDto[]> {
    const movies = await this.moviesService.findAll()

    return this.movieSerializer.serializeCollection(movies)
  }
}

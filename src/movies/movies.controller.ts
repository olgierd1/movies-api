import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CreateMovieDto } from './dto/create.movie.dto';
import { MoviesService } from './movies.service';
import { MovieSerializerService } from './movie.serializer';
import { MovieDto } from './dto/movie.dto';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(
  private readonly moviesService: MoviesService,
  private readonly movieSerializer: MovieSerializerService) { }
  
  @Post()
  @HttpCode(204)
  @ApiNoContentResponse()
  create(@Body() payload: CreateMovieDto): Promise<void>  {
    return this.moviesService.create(payload)
  }

  @Get()
  @ApiOkResponse({
    type: MovieDto,
    isArray: true
  })
  async findAll(): Promise<MovieDto[]> {
    const movies = await this.moviesService.findAll()

    return this.movieSerializer.serializeCollection(movies)
  }
}

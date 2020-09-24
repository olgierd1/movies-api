import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMovieDto } from './dto/create.movie.dto';
import { MoviesService } from './movies.service';
import { MovieDto } from './dto/movie.dto';
import { ApiCreatedResponse , ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { MovieSerializerService } from './movie.serializer';
import { string } from 'joi';

export class FindOneParams {
  @IsUUID('all', {message: 'Provide valid uuid'})
  uuid: string
}

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly moviesSerializer: MovieSerializerService
  ) { }
  
  @Post()
  @ApiCreatedResponse()
  create(@Body() payload: CreateMovieDto): Promise<void>  {
    return this.moviesService.create(payload)
  }

  @Get()
  @ApiOkResponse({
    type: String,
    isArray: true
  })
  findAll(): Promise<string[]> {
    return this.moviesService.findAll()
  }

  @Get(':uuid')
  @ApiOkResponse({
    type: MovieDto
  })
  @ApiParam({name: 'uuid'})
  async find(@Param() params: FindOneParams): Promise<MovieDto> {
    return this.moviesSerializer.serialize(await this.moviesService.find(params.uuid))
  }
}


import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { CreateMovieDto } from './dto/create.movie.dto';
import fetch from 'node-fetch';
import { Movie } from './movie.model';
import { ConfigService } from '@nestjs/config';
import { MovieSerializerService } from './movie.serializer';
import { MovieDto } from './dto/movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    private connection: Connection,
    private readonly configService: ConfigService,
    private readonly movieSerializerService: MovieSerializerService
  ) { }
  
  private async fetchMovie(opts: CreateMovieDto): Promise<MovieDto> {
    try {
      const response = await fetch(`${this.configService.get('RESOURCE_BASE_URL')}&t=${opts.title}`)
      const data = await response.json()
      if (data && data.Error) {
        throw new NotFoundException(data.Error)
      }
      return this.movieSerializerService.convertToEntity(data)
    } catch (error) {
      throw error
     }
  }

  async create(opts: CreateMovieDto): Promise<void> {
    const movie = await this.fetchMovie(opts)

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const finded = await queryRunner.manager.find(Movie, {
        where: { title: movie.title }
      })
      if (finded && finded.length > 0) {
        throw new ConflictException('Movie already exists in Database')
      }
      await queryRunner.manager.save(new Movie(movie))

      await queryRunner.commitTransaction()
    } catch (err) {
      await queryRunner.rollbackTransaction()
      throw err
    } finally {
      await queryRunner.release()
    }
  }

  findAll(): Promise<Movie[]> {
    return this.connection.getRepository(Movie).find()
  }
}


 export interface PureMovie {
  Title: string
  Year: string
  Actors: string
  Director: string
  Plot: string
}
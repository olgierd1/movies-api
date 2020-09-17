import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { CreateMovieDto } from './dto/create.movie.dto';
import { Movie } from './movie.model';
import { OmdbService } from 'src/omdb/omdb.service';

@Injectable()
export class MoviesService {
  constructor(
    private connection: Connection,
    private readonly omdbService: OmdbService
  ) { }
  

  private convert(data: BareMovie): FoundMovie {
    return {
      title: data.Title,
      director: data.Director,
      actors: data.Actors,
      plot: data.Plot,
      year: data.Year
    }
  }

  public async create(opts: CreateMovieDto): Promise<void> {
    const data = await this.omdbService.fetchMovie(opts) as BareMovie
    const movie = this.convert(data)

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const found = await queryRunner.manager.findOne(Movie, {
        where: { title: movie.title }
      })
      if (found) {
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

  public async findAll(): Promise<string[]> {
    return (await this.connection.getRepository(Movie)
      .find({select: ['id']})).map(movie => movie.id)
  }

  public async find(uuid: string): Promise<Movie> {
    const found = await this.connection.getRepository(Movie).findOne(uuid)
    if (!found) {
      throw new NotFoundException()
    }
    
    return found
  }
}


interface FoundMovie {
  title: string
  year: string
  actors: string
  director: string
  plot?: string
}

interface BareMovie {
  Title: string
  Year: string
  Actors: string
  Director: string
  Plot?: string
}
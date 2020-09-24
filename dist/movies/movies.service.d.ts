import { Connection } from 'typeorm';
import { CreateMovieDto } from './dto/create.movie.dto';
import { Movie } from './movie.model';
import { OmdbService } from '../omdb/omdb.service';
export declare class MoviesService {
    private connection;
    private readonly omdbService;
    constructor(connection: Connection, omdbService: OmdbService);
    private convert;
    create(opts: CreateMovieDto): Promise<void>;
    findAll(): Promise<string[]>;
    find(uuid: string): Promise<Movie>;
}

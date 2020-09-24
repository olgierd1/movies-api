import { CreateMovieDto } from './dto/create.movie.dto';
import { MoviesService } from './movies.service';
import { MovieDto } from './dto/movie.dto';
import { MovieSerializerService } from './movie.serializer';
export declare class FindOneParams {
    uuid: string;
}
export declare class MoviesController {
    private readonly moviesService;
    private readonly moviesSerializer;
    constructor(moviesService: MoviesService, moviesSerializer: MovieSerializerService);
    create(payload: CreateMovieDto): Promise<void>;
    findAll(): Promise<string[]>;
    find(params: FindOneParams): Promise<MovieDto>;
}

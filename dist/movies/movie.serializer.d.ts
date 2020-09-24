import { BaseSerializerService } from "../serialize/base.serializer";
import { Movie } from "./movie.model";
import { MovieDto } from "./dto/movie.dto";
import { CommentsSerializerService } from "../comments/comment.serializer";
export declare class MovieSerializerService extends BaseSerializerService<Movie, MovieDto> {
    private readonly commentsSerializerService;
    constructor(commentsSerializerService: CommentsSerializerService);
    serialize(entity: Movie): MovieDto;
}

import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';
import { CreateCommentDto } from './dto/create.comment.dto';
import { FindOneParams } from 'src/movies/movies.controller';
import { CommentsSerializerService } from './comment.serializer';
export declare class CommentsController {
    private readonly commentsService;
    private readonly commentsSerializerService;
    constructor(commentsService: CommentsService, commentsSerializerService: CommentsSerializerService);
    create(payload: CreateCommentDto): Promise<void>;
    findAll(): Promise<string[]>;
    find(params: FindOneParams): Promise<CommentDto>;
}

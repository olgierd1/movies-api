import { Connection } from 'typeorm';
import { CreateCommentDto } from './dto/create.comment.dto';
import { Comment } from './comment.model';
export declare class CommentsService {
    private connection;
    constructor(connection: Connection);
    create(commentDto: CreateCommentDto): Promise<void>;
    findAll(): Promise<string[]>;
    find(uuid: string): Promise<Comment>;
}

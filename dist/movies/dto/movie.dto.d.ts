import { CommentDto } from "../../comments/dto/comment.dto";
export declare class MovieDto {
    id: string;
    title: string;
    director: string;
    year: number;
    actors: string;
    plot: string;
    comments: CommentDto[];
}

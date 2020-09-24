import { Comment } from '../comments/comment.model';
export declare class Movie {
    id: string;
    title: string;
    director: string;
    year: number;
    actors: string;
    plot: string;
    comments: Comment[];
    constructor(partial: Partial<Movie>);
}

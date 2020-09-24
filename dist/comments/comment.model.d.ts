import { Movie } from '../movies/movie.model';
export declare class Comment {
    id: string;
    text: string;
    author: string;
    movie: Movie;
    constructor(partial: Partial<Comment>);
}

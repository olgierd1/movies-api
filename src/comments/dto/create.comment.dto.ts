import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  movieTitle: string

  @IsString()
  text: string

  @IsString()
  author: string

}
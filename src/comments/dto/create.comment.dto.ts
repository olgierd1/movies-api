import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  movieTitle: string

  @IsString()
  @IsNotEmpty()
  text: string

  @IsString()
  @IsNotEmpty()
  author: string

}
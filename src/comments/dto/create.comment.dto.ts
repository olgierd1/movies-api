import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsString({message: 'Movie title must be string'})
  @MaxLength(200, {message: 'Movie title is too long. Max size is 200'})
  @IsNotEmpty({message: 'Movie Title can not be empty'})
  @ApiProperty({maxLength: 200})
  movieTitle: string

  @IsString({message: 'Text must be string'})
  @MaxLength(200, {message: 'Comment text is too long. Max size is 200'})
  @IsNotEmpty({message: 'Text can not be empty'})
  @ApiProperty({maxLength: 200})
  text: string

  @IsString({message: 'Author must be string'})
  @MaxLength(200, {message: 'Comment author is too long. Max size is 200'})
  @IsNotEmpty({ message: 'Author can not be empty' })
  @ApiProperty({ maxLength: 200 })
  author: string

}
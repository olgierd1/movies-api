import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsString({message: 'moviTitle must be string'})
  @IsNotEmpty({message: 'movieTitle can not be empty'})
  @MaxLength(200)
  @MinLength(1)
  @ApiProperty({maxLength: 200, minLength: 1})
  movieTitle: string

  @IsString({message: 'text must be string'})
  @IsNotEmpty({message: 'text can not be empty'})
  @MaxLength(400)
  @MinLength(1)
  @ApiProperty({maxLength: 200, minLength: 1})
  text: string

  @IsString({message: 'author must be string'})
  @IsNotEmpty({ message: 'author can not be empty' })
  @MaxLength(200)
  @MinLength(1)
  @ApiProperty({ maxLength: 200, minLength: 1 })
  author: string

}
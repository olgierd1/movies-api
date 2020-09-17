import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  movieTitle: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  text: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  author: string

}
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {  IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @MaxLength(200, {message: 'Movie title is too long. Max size is 200'})
  @IsNotEmpty({message: 'Title can not be empty string'})
  @ApiProperty({maxLength: 200})
  title: string


  @IsString()
  @IsOptional()
  @Min(0, {message: 'Min year value is 0'})
  @IsNotEmpty({message: 'Year can not be empty'})
  @ApiPropertyOptional({minimum: 0})
  year: number
}
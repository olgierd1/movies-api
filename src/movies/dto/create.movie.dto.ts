import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {  IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class CreateMovieDto {
  @IsString({message: 'title must be a string'})
  @IsNotEmpty({ message: 'title can not be empty string' })
  @MinLength(0)
  @MaxLength(200)
  @ApiProperty({maxLength: 200, minLength: 0})
  title: string


  @IsInt()
  @IsOptional()
  @Min(0, {message: 'Min year value is 0'})
  @IsNotEmpty({message: 'Year can not be empty'})
  @ApiPropertyOptional({minimum: 0})
  year: number
}
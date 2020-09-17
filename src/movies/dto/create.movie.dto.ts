import {  IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string


  @IsString()
  @IsOptional()
  @IsNotEmpty()
  year: string
}
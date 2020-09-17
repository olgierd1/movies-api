import {  IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title: string


  @IsString()
  @IsOptional()
  year: number
}
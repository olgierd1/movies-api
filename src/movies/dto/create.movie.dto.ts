import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {  IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string


  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional()
  year: string
}
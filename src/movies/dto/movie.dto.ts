import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class MovieDto {
  @ApiProperty()
  title: string

  @ApiProperty()
  director: string

  @ApiProperty()
  year: string

  @ApiProperty()
  actors: string

  @ApiPropertyOptional()
  plot: string
}
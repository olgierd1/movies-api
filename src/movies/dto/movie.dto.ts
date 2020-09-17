import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { CommentDto } from "src/comments/dto/comment.dto";

export class MovieDto {
  @ApiProperty()
  id: string

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

  @ApiPropertyOptional({
    type: CommentDto,
    isArray: true
  })
  comments: CommentDto[]
}
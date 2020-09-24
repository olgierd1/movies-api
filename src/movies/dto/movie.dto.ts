import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { CommentDto } from "../../comments/dto/comment.dto";


export class MovieDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  title: string

  @ApiProperty()
  director: string

  @ApiProperty({minimum: 0})
  year: number

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
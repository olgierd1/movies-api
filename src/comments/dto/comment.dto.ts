import { ApiProperty } from "@nestjs/swagger";

export class CommentDto {
  @ApiProperty()
  text: string

  @ApiProperty()
  author: string
}

export class MovieCommentsDto {
  @ApiProperty()
  title: string
  
  @ApiProperty({
    type: CommentDto,
    isArray: true
  })
  comments: CommentDto[]
}
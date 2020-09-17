import { ApiProperty } from "@nestjs/swagger";

export class CommentDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  text: string

  @ApiProperty()
  author: string
}

export class MovieCommentsDto {

  title: string
  
  comments: CommentDto[]
}

export class CommentDto {
  text: string

  author: string
}
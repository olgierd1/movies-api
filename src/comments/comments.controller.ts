import { Body, Controller, Get, Post } from '@nestjs/common';
import { MovieCommentsSerializerService } from './comment.serializer';
import { CommentsService } from './comments.service';
import { MovieCommentsDto } from './dto/comment.dto';
import { CreateCommentDto } from './dto/create.comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly movieCommentsSerializerService: MovieCommentsSerializerService
  ) { }

  @Post()
  create(@Body() body: CreateCommentDto): Promise<void> {
    return this.commentsService.create(body)
  }
  
  @Get()
  async find(): Promise<MovieCommentsDto[]> {
    const moviesComments = await this.commentsService.findAll()
    return this.movieCommentsSerializerService.serializeCollection(moviesComments)
  }
}

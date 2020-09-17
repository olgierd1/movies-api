import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common'
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { MovieCommentsSerializerService } from './comment.serializer'
import { CommentsService } from './comments.service'
import { MovieCommentsDto } from './dto/comment.dto'
import { CreateCommentDto } from './dto/create.comment.dto'

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly movieCommentsSerializerService: MovieCommentsSerializerService
  ) { }

  @Post()
  @HttpCode(204)
  @ApiNoContentResponse()
  create(@Body() payload: CreateCommentDto): Promise<void> {
    return this.commentsService.create(payload)
  }
  
  @Get()
  @ApiOkResponse({
    type: MovieCommentsDto,
    isArray: true
  })
  async find(): Promise<MovieCommentsDto[]> {
    const moviesComments = await this.commentsService.findAll()
    return this.movieCommentsSerializerService.serializeCollection(moviesComments)
  }
}

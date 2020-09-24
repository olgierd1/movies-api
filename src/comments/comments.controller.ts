import { Body, Controller, Get, Param, Post, UseFilters } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger'
import { string } from 'joi';
import { CommentsService } from './comments.service'
import { CommentDto } from './dto/comment.dto'
import { CreateCommentDto } from './dto/create.comment.dto'
import { FindOneParams } from 'src/movies/movies.controller';
import { CommentsSerializerService } from './comment.serializer';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly commentsSerializerService: CommentsSerializerService
  ) { }

  @Post()
  @ApiCreatedResponse()
  create(@Body() payload: CreateCommentDto): Promise<void> {
    return this.commentsService.create(payload)
  }
  
  @Get()
  @ApiOkResponse({
    type: String,
    isArray: true
  })
  async findAll(): Promise<string[]> {
    return await this.commentsService.findAll()
  }

  @Get(':uuid')
  @ApiOkResponse({
    type: CommentDto
  })
  @ApiParam({name: 'uuid'})
  async find(@Param() params: FindOneParams): Promise<CommentDto> {
    return this.commentsSerializerService.serialize((await this.commentsService.find(params.uuid)))
  }
}

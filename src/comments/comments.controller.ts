import { Body, Controller, Get, Param, Post, UseFilters } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { string } from 'joi';
import { CommentsService } from './comments.service'
import { CommentDto } from './dto/comment.dto'
import { CreateCommentDto } from './dto/create.comment.dto'
import { FindOneParams } from 'src/movies/movies.controller';
import { CommentsSerializerService } from './comment.serializer';
import { BadRequestExceptionFilter } from 'src/exception/badRequest.exception.filter';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly commentsSerializerService: CommentsSerializerService
  ) { }

  @Post()
  @ApiCreatedResponse()
  @UseFilters(new BadRequestExceptionFilter())
  create(@Body() payload: CreateCommentDto): Promise<void> {
    return this.commentsService.create(payload)
  }
  
  @Get()
  @ApiOkResponse({
    type: string,
    isArray: true
  })
  async findAll(): Promise<string[]> {
    return await this.commentsService.findAll()
  }

  @Get(':uuid')
  @ApiOkResponse({
    type: CommentDto
  })
  async find(@Param() params: FindOneParams): Promise<CommentDto> {
    return this.commentsSerializerService.serialize((await this.commentsService.find(params.uuid)))
  }
}

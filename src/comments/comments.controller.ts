// comments.controller.ts

import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comment.model';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  getAllComments(): Comment[] {
    return this.commentsService.getAllComments();
  }

  @Get(':id')
  getComment(@Param('id') id: string): Comment | undefined {
    return this.commentsService.getComment(id);
  }

  @Post()
  createComment(@Body() commentData: Comment): Comment {
    return this.commentsService.createComment(commentData);
  }
}

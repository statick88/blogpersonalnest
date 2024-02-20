
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comment.model';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  getAllComments(@Param('postId') postId: string): Comment[] {
    return this.commentsService.getAllComments(postId);
  }

  @Post()
  createComment(
    @Param('postId') postId: string,
    @Body('author') author: string,
    @Body('content') content: string,
  ): Comment {
    return this.commentsService.createComment(postId, author, content);
  }
}
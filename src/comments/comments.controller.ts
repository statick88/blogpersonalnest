import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comment.model';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  getAllCommentsForPost(@Param('postId') postId: string): Comment[] {
    return this.commentsService.getAllCommentsForPost(postId);
  }

  @Post()
  createComment(@Param('postId') postId: string, @Body() commentData: Comment): Comment {
    return this.commentsService.createComment(postId, commentData);
  }
}

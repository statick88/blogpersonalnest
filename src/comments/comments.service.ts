import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Comment } from './comment.model';

@Injectable()
export class CommentsService {
  private comments: Comment[] = [];

  getAllCommentsForPost(postId: string): Comment[] {
    return this.comments.filter((comment) => comment.postId === postId);
  }

  createComment(postId: string, commentData: Comment): Comment {
    if (!commentData.content) {
      throw new BadRequestException('Content is required');
    }

    const newComment: Comment = {
      id: uuidv4(), 
      postId: postId,
      content: commentData.content, 
    };

    this.comments.push(newComment);
    return newComment;
  }

  
}

import { Injectable } from '@nestjs/common';
import { Comment } from './comment.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CommentsService {
  private comments: Comment[] = [];

getAllComments(postId: string): Comment[] {
    return this.comments.filter(comment => comment.postId === postId);
}

createComment(postId: string, author: string, content: string): Comment {
    const newComment: Comment = {
        id: '1',
        postId,
        author,
        content,
      };

    this.comments.push(newComment);
    return newComment;
}
}
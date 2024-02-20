import { Injectable } from '@nestjs/common';
import { Comment } from './comment.model';

@Injectable()
export class CommentsService {
  private comments: Comment[] = [];

  getAllComments(): Comment[] {
    return this.comments;
  }

  getComment(id: string): Comment | undefined {
    return this.comments.find(comment => comment.id === id);
  }

  createComment(commentData: Comment): Comment {
    const newComment: Comment = {
      id: "",
      createdAt: new Date(),
      content: commentData.content, // Asegúrate de tener la propiedad content en tu Comment model
      // Otros campos del comentario si los tienes
    };

    this.comments.push(newComment);
    return newComment;
  }
}

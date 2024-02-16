import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Comment } from './comment.model';

@Injectable()
export class CommentsService {
  private comments: Comment[] = [];

  constructor() {
    // Agregar algunos posts de prueba al iniciar la aplicación
    this.createPost({
      id: uuidv4(),
      date: '12-12-12',
      content: 'Contenido del comentario 1',
    });
    this.createPost({
      id: uuidv4(),
      date: '12-12-14',
      content: 'Contenido del comentario 2',
    });
    this.createPost({
      id: uuidv4(),
      date: '12-12-15',
      content: 'Contenido del comentario 3',
    });
  }

  getAllPosts(): Comment[] {
    return this.comments;
  }

  getPost(id: string): Comment | undefined {
    return this.comments.find((comment) => comment.id === id);
  }

  createPost(commentData: Comment): Comment {
    if (!commentData.date || !commentData.content) {
      throw new BadRequestException('Title and content are required');
    }

    const newComment: Comment = {
      id: uuidv4(),
      date: commentData.date,
      content: commentData.content,
    };

    this.comments.push(newComment);
    return newComment;
  }

  updatePost(id: string, commentData: Comment): Comment {
    const commentIndex = this.comments.findIndex((comment) => comment.id === id);
    if (commentIndex === -1) {
      throw new NotFoundException('Comment not found');
    }

    this.comments[commentIndex] = { ...this.comments[commentIndex], ...commentData };

    return this.comments[commentIndex];
  }

  deletePost(id: string): void {
    this.comments = this.comments.filter((comment) => comment.id !== id);
  }
}

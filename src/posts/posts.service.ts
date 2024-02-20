import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Post } from './post.model';
import { Comment } from '../comments/comment.model'; // Importa el modelo de comentarios
import { CommentsService } from '../comments/comments.service'; // Importa el servicio de comentarios

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  constructor(private readonly commentsService: CommentsService) {
    // Agregar algunos posts de prueba al iniciar la aplicación
    this.createPost({
      id: uuidv4(),
      title: 'Post 1',
      content: 'Contenido del post 1',
      comments: [
        { id: uuidv4(), content: 'Primer comentario', createdAt: new Date() },
        { id: uuidv4(), content: 'Segundo comentario', createdAt: new Date() },
      ],
    });
    this.createPost({
      id: uuidv4(),
      title: 'Post 2',
      content: 'Contenido del post 2',
      comments: [
        { id: uuidv4(), content: 'Primer comentario', createdAt: new Date() },
      ],
    });
    this.createPost({
      id: uuidv4(),
      title: 'Post 3',
      content: 'Contenido del post 3',
      comments: [],
    });
  }

  getAllPosts(): Post[] {
    return this.posts;
  }

  getPost(id: string): Post | undefined {
    return this.posts.find((p) => p.id === id);
  }

  getComments(postId: string): Comment[] | undefined {
    const post = this.getPost(postId);
    return post?.comments;
  }

  createPost(postData: Post): Post {
    if (!postData.title || !postData.content) {
      throw new BadRequestException('Title and content are required');
    }

    const newPost: Post = {
      id: postData.id,
      title: postData.title,
      content: postData.content,
      comments: postData.comments || [],
    };

    this.posts.push(newPost);
    return newPost;
  }

  createComment(postId: string, commentData: Comment): Comment {
    const post = this.getPost(postId);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const newComment = this.commentsService.createComment(commentData);
    post.comments = post.comments || [];
    post.comments.push(newComment);
    return newComment;
  }

  getComment(postId: string, commentId: string): Comment | undefined {
    const post = this.getPost(postId);
    return post?.comments?.find((comment) => comment.id === commentId);
  }

  updatePost(id: string, postData: Post): Post {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      throw new NotFoundException('Post not found');
    }

    this.posts[postIndex] = { ...this.posts[postIndex], ...postData };

    return this.posts[postIndex];
  }

  deletePost(id: string): void {
    this.posts = this.posts.filter((post) => post.id !== id);
  }
}

// posts.controller.ts

import { Controller, Get, UseGuards } from '@nestjs/common';
import { PostsService } from './posts/posts.service'; // Import the correct module
import { AuthGuard } from '../src/auth/auth.guard'; // Importa el guardia de autenticación

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @UseGuards(AuthGuard) // Aplica el guardia de autenticación al método GET
  async getAllPosts(): Promise<any[]> {
    return this.postsService.getAllPosts();
  }
}

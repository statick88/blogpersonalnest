import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
// import { PostSchema } from './post.model'; // Cambiado de 'import { Post as PostModel } from './post.model';' a 'import { PostSchema } from './post.model';'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts(): Promise<any[]> {
    // Cambiado de Promise<PostModel[]> a Promise<any[]>
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  async getPost(@Param('id') id: string): Promise<any> {
    // Cambiado de Promise<PostModel> a Promise<any>
    const post = await this.postsService.getPost(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  @Post()
  async createPost(): Promise<any> {
    // Implement the logic to create a post
  }

  @Put(':id')
  async updatePost(
    @Param('id') id: string,
    @Body() postData: any, // Cambiado de PostModel a any
  ): Promise<any> {
    // Cambiado de Promise<PostModel> a Promise<any>
    if (!postData.title && !postData.content) {
      throw new BadRequestException(
        'At least one of title or content must be provided',
      );
    }
    return this.postsService.updatePost(id, postData);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<void> {
    return this.postsService.deletePost(id);
  }
}

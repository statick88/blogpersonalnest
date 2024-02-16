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
  InternalServerErrorException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostModel } from './post.model';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts(): Promise<PostModel[]> {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  async getPost(@Param('id') id: string): Promise<PostModel> {
    const post = await this.postsService.getPost(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  @Post()
  async createPost(@Body() postData: PostModel): Promise<PostModel> {
    try {
      console.log('Received postData:', postData); // Agregar este registro de depuración
      return await this.postsService.createPost(postData);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  @Put(':id')
  async updatePost(
    @Param('id') id: string,
    @Body() postData: PostModel,
  ): Promise<PostModel> {
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

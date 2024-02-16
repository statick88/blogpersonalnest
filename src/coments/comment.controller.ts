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
import { CommentsService } from './comment.service';
import { Comment as CommentModel } from './comment.model';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getAllPosts(): Promise<CommentModel[]> {
    return this.commentsService.getAllPosts();
  }

  @Get(':id')
  async getPost(@Param('id') id: string): Promise<CommentModel> {
    const comment = await this.commentsService.getPost(id);
    if (!comment) {
      throw new NotFoundException('Post not found');
    }
    return comment;
  }

  @Post()
  async createPost(@Body() commentData: CommentModel): Promise<CommentModel> {
    try {
      console.log('Received postData:', commentData); // Agregar este registro de depuración
      return await this.commentsService.createPost(commentData);
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
    @Body() commentData: CommentModel,
  ): Promise<CommentModel> {
    if (!commentData.date && !commentData.content) {
      throw new BadRequestException(
        'At least one of title or content must be provided',
      );
    }
    return this.commentsService.updatePost(id, commentData);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<void> {
    return this.commentsService.deletePost(id);
  }
}

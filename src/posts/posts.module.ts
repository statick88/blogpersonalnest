import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { CommentsService } from '../comments/comments.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, CommentsService],
})
export class PostsModule {}

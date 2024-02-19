import{Module, NestModule, MiddlewareConsumer} from '@nestjs/common';
import { JwtMiddleware } from './auth/jwt.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { Module} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module'; // Importa el módulo de posts

@Module({
  imports: [AuthModule, PostsModule], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{

  configure(consumer: MiddlewareConsumer){
    consumer.apply(JwtMiddleware).forRoutes('posts');
  }
}

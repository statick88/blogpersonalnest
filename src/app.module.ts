// app.module.ts

import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/auth.middleware'; // Importa el middleware de autenticación
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [AuthModule, PostsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Registra el middleware de autenticación para todas las rutas en la aplicación.
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}

# Blog Personal Nest

Este es un proyecto de blog personal desarrollado con NestJS.

## Sugerencia

¡Antes de clonar o realizar un fork de este repositorio, te animamos a que intentes crear el proyecto desde cero siguiendo el tutorial!

## Tutorial

Si deseas aprender a implementar autenticación en un blog personal con NestJS, te invitamos a seguir el tutorial en el siguiente enlace: 

- [**Tutorial:** Implementación de un Blog Personal con Nest.js](/Tutoriales/tutorial.md)

- [**Tutorial:** Implementación de Autenticación en un Blog Personal con Nest.js](/Tutoriales/tutorial-auth.md)

## Descripción

Este proyecto es un blog personal desarrollado utilizando el framework NestJS, que permite a los usuarios crear, leer, actualizar y eliminar publicaciones. Utiliza una arquitectura modular y está diseñado siguiendo los principios de RESTful API.

## Funcionalidades

- Crear una nueva publicación
- Leer una publicación existente
- Actualizar una publicación existente
- Eliminar una publicación existente

## Tecnologías utilizadas

- NestJS
- TypeScript
- UUID

## Instalación

- Clona este repositorio: git clone https://github.com/statick88/blogpersonalnest
- Instala las dependencias: npm install

## Uso

- Inicia el servidor de desarrollo: npm run start:dev
- Realiza las peticiones HTTP utilizando tu herramienta favorita como Thunder Client.

## Endpoints

- GET /posts: Obtener todas las publicaciones
- GET /posts/:id: Obtener una publicación por su ID
- POST /posts: Crear una nueva publicación
- PUT /posts/:id: Actualizar una publicación existente
- DELETE /posts/:id: Eliminar una publicación existente

## Autenticación

Para proteger las rutas y los recursos, se ha implementado la autenticación mediante tokens JWT (JSON Web Tokens). 

Debes obtener un token de acceso enviando una solicitud POST a `/auth/login` con las credenciales de usuario. Luego, incluye este token en la cabecera Authorization de tus solicitudes HTTP utilizando el esquema Bearer.

## Mejoras Futuras

- [✅] Implementación de autenticación y autorización.
- [❌] Implementación de comentarios en las publicaciones.
- [❌] Mejorar la validación de datos en las solicitudes POST y PUT.


## Contribuyendo

¡Las contribuciones son bienvenidas! Si tienes alguna sugerencia, mejora o corrección, por favor crea un pull request.

## Licencia

[MIT](LICENSE)

## Actualizaciones
### Comentarios
Se implemento la funcion de comentarios en los posts de la siguiente manera:
- Se creo una carpeta donde se encontraran todos nuestros archivos para implementar los comentarios en `src/comments`
- Se creo un archivo (comment.model.ts):

```
// src/comments/comment.model.ts
export interface Comment {
	id: string;
	content: string;
	createdAt: Date;
}
```

- Se creo un archivo (comments.service.ts):

``` 
// src/comments/comments.service.ts
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
			content: commentData.content,
			// Aqui pueden ir otros campos segun sea necesario
		};
		this.comments.push(newComment);
		return newComment;
	}
}```

- Se creo un archivo (comments.controller.ts):

```
// src/comments/comments.controller.ts

import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comment.model';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  getAllComments(): Comment[] {
    return this.commentsService.getAllComments();
  }

  @Get(':id')
  getComment(@Param('id') id: string): Comment | undefined {
    return this.commentsService.getComment(id);
  }

  @Post()
  createComment(@Body() commentData: Comment): Comment {
    return this.commentsService.createComment(commentData);
  }
}
```

- Actualizacion en el Modelo de Publicación (post.model.ts):

```
//src/posts/post.model.ts
import { Comment } from '../comments/comment.model';

export interface Post {
  id: string;
  title: string;
  content: string;
  comments?: Comment[];
}
```

- Actualizacion el Servicio de Publicaciones (posts.service.ts):

```
//src/posts/posts.service.ts
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

  /*
  Aqui va el codigo delos metodos>
  getAllPosts(): Post[] 
  getPost(id: string)
   createPost(postData: Post)
   deletePost(id: string)
  */


	/*Metodos para retornar los comentarios con endpoints*/
  getComments(postId: string): Comment[] | undefined {
    const post = this.getPost(postId);
    return post?.comments;
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
}

```

- Actualizacion en el modulo de (posts.module.ts):

```
// posts.module.ts

import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { CommentsModule } from '../comments/comments.module'; // Asegúrate de importar el módulo que contiene CommentsService

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [CommentsModule], // Agrega el módulo que contiene CommentsService aquí
})
export class PostsModule {}

```

Con estos cambios realizados se han implementado la seccion de comentarios en el sitema

### Atentificacion con middleware

Al momento de realizar cualquier metodo get/post/put/delete se necesita enviar un header con `Authorization: <tu token>`, en nuestro caso aun no se ha implemntado la parte de la obtencion del token de autentificacion asi que basta con que en el header se envie `Authorization: <cualquiere letra/numero/simbolo>` que se quiera enviar ya que solo se verifica que `Authorization` no se encuentre vacio, y con ello se puede lograr acceder a los endpoints implementados.

#### Pasos que se siguieron para la impleemnteacion

- Creamos un Controlador Middleware (auth.middleware.ts):

```
// auth.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Aquí puedes agregar la lógica de autenticación según sea necesario

    // Ejemplo: Verificar si hay un encabezado 'Authorization' con un token.
    const token = req.headers['authorization'];

    if (!token) {
      // Si no hay token, puedes manejar la falta de autenticación aquí.
      return res.status(401).json({ message: 'No autorizado, se requiere un token' });
    }
    next();
  }
}

```

- Creamos un Interceptor (logging.interceptor.ts):

```
// logging.interceptor.ts

import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs'; // Importa el operador 'tap' de RxJS

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Puedemos realizar acciones antes o después de procesar la solicitud aquí
    console.log('Solicitud recibida...');
    const now = Date.now();

    return next.handle().pipe(
      // Utiliza el operador 'tap' para realizar acciones secundarias sin modificar la respuesta
      tap(() => console.log(`Solicitud procesada en ${Date.now() - now}ms`)),
    );
  }
}

```

- Creamos un Filtro de Excepciones (exception.filter.ts):

```
// exception.filter.ts

import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}

```

- Modificamos (app.module.ts) para agregar nuestra autentificacion con Middleware

```
// app.module.ts

import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthMiddleware } from './auth.middleware';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [PostsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Registra el middleware de autenticación para todas las rutas en la aplicación.
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
```
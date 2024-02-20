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

// jwt-auth.guard.ts

import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    // Obtener el token de autorización del encabezado de la solicitud
    const authorizationHeader = request.headers['authorization'];
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      // Si no se proporciona un token o no está en el formato correcto, la solicitud no es válida
      return false;
    }

    // Extraer el token JWT de la cabecera de autorización
    const token = authorizationHeader.split(' ')[1];
    // Adjuntar el token al objeto de solicitud para que esté disponible en el controlador
    request.jwtToken = token;

    return super.canActivate(context);
  }
}

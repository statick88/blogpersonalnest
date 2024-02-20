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

// auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    // Verificar las credenciales del usuario
    const isValidCredentials = await this.validateCredentials(
      username,
      password,
    );
    if (!isValidCredentials) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Generar y devolver un token JWT
    const payload = { username };
    const accessToken = this.jwtService.sign(payload);

    return { access_token: accessToken };
  }

  async validateCredentials(
    username: string,
    password: string,
  ): Promise<boolean> {
    // Aquí debes implementar la lógica para verificar las credenciales del usuario
    // Esto puede implicar consultar una base de datos o un servicio externo
    // Devuelve true si las credenciales son válidas, de lo contrario false
    // Por ejemplo, puedes comparar las credenciales con un conjunto predefinido
    // de credenciales almacenadas en algún lugar, como una base de datos.
    // Esta es una implementación de ejemplo que verifica credenciales hardcoded.

    // Verifica si las credenciales son válidas
    const isValid = username === 'usuario' && password === 'contraseña';

    // Devuelve true si las credenciales son válidas, de lo contrario, false
    return isValid;
  }

}

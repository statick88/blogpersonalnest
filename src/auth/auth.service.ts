import { User } from './user.model';
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
   arrayUsuarios: User[] = [
    { username: "usuario1", password: "contrasena1" },
    { username: "usuario2", password: "contrasena2" },
    // Agrega más usuarios según sea necesario
  ];
  async validateCredentials(
    username: string,
    password: string,
  ): Promise<boolean> {
    for (const user of this.arrayUsuarios) {
      if (user.username === username && user.password === password) {
        return true;
      }
    }
    return false; // Replace with your logic to validate the credentials
  }
}

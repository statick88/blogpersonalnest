import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy'; // Importa la estrategia JWT
import { jwtConstants } from './jwt.constants'; // Importa las constantes JWT

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret, // Usa la clave secreta de las constantes JWT
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // Agrega JwtStrategy a los providers
})
export class AuthModule {}

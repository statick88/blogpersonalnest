import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('protected-route')
  @UseGuards(JwtAuthGuard)
  async protectedRoute() {
    return { message: 'Esta es una ruta protegida' };
  }
}

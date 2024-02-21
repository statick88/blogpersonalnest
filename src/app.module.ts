// src/app.module.ts

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module'; // Asegúrate de importar el AuthModule
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AuthModule], // Asegúrate de incluir el AuthModule en los imports
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

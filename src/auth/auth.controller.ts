import { AuthService } from './auth.service';
import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async insert(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const result = await this.authService.register(username, password);
    if (result) {
      return { registered: true, message: 'Ok' };
    } else {
      return { registered: false, message: 'El usuario ya existe' };
    }
  }
}

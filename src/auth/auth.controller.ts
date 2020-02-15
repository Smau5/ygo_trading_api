import { AuthService } from './auth.service';
import { Controller, Get, Post, Body } from '@nestjs/common';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  insert(
    @Body('username') username: string,
    @Body('password') password: string,
  ): any {
    return this.authService.register(username, password);
  }
}

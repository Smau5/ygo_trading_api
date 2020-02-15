import { UserService } from './user.service';
import { Controller, Get, Post, Body } from '@nestjs/common';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  findAll(): any {
    return this.userService.findAll();
  }

  @Post()
  insert(
    @Body('username') username: string,
    @Body('password') password: string,
  ): any {
    return this.userService.insert(username, password);
  }
}

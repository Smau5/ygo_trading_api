import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');
const saltRounds = 10;
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    return bcrypt.compare(pass, user.password).then(valid => {
      if (valid === true) {
        const { password, ...result } = user;
        return result;
      } else {
        return null;
      }
    });
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(username: string, password: string) {
    bcrypt.hash(password, saltRounds).then(hash => {
      return this.usersService.insert(username, hash);
    });
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async insert(username: string, password: string) {
    const user = new User();
    user.username = username;
    user.password = password;
    return this.userRepository.save(user);
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ username: username });
  }
}

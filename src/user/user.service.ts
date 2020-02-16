import { Injectable, Inject, Logger } from '@nestjs/common';
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

  async checkDuplicateUsername(username: string, password: string) {
    const duplicateUsername = await this.userRepository.find({
      username: username,
    });
    if (duplicateUsername.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  async insert(username: string, password: string) {
    const user = new User();
    user.username = username;
    user.password = password;
    return this.userRepository
      .save(user)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ username: username });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  createUser(user: CreateUser) {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async findUserByEmail(email: string) {
    const user = await this.usersRepository.findBy({ email });
    return user;
  }

  async findUserById(id: number) {
    const user = await this.usersRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
}

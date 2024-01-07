import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser } from './interfaces/user.interface';
import { randomBytes, scrypt as scrypter } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(scrypter);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(user: CreateUser) {
    const users = await this.usersService.findUserByEmail(user.email);
    if (users.length) {
      throw new BadRequestException(`User ${user.email} already exists`);
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(user.password, salt, 32)) as Buffer;
    const newPassword = salt + '.' + hash.toString('hex');

    const newUser = await this.usersService.createUser({
      ...user,
      password: newPassword,
    });

    return newUser;
  }

  async signin(email: string, password: string) {
    const [existingUser] = await this.usersService.findUserByEmail(email);

    if (!existingUser) {
      throw new NotFoundException(`User  ${email} not found`);
    }

    const [salt, storedHash] = existingUser.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Invalid password');
    }

    return existingUser;
  }
}

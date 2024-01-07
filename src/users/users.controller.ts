import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';

@serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() user: CreateUserDto) {
    return this.authService.signup(user);
  }

  @Post('/signin')
  signin(@Body() user: Partial<CreateUserDto>) {
    return this.authService.signin(user.email, user.password);
  }
}

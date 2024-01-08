import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

@serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('/signup')
  async signup(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: Partial<CreateUserDto>, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    console.log(session);
    return user;
  }

  @Get('/whoami')
  async whoAmI(@Session() session: any) {
    return await this.usersService.findUserById(session.userId);
  }
}

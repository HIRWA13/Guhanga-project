import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInDto } from 'src/reviews/dtos/sign-in.dto';

@ApiTags('User')
@serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({
    type: CreateUserDto,
    description: 'User Information',
  })
  @Post('/signup')
  async signup(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body);
    session.userId = user.id;
    return user;
  }

  @ApiResponse({
    status: 201,
    description: 'The user has been successfully logged in.',
    type: UserDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({
    type: SignInDto,
    description: 'provide email and password',
  })
  @Post('/signin')
  async signin(@Body() body: Partial<CreateUserDto>, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @ApiResponse({
    status: 200,
    description: 'there is a signed in user.',
    type: UserDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiParam({
    name: '/whoami',
    description: 'use /whoami to check the user who is logged in',
    type: String,
  })
  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @ApiResponse({
    status: 201,
    description: 'User signed out successfully',
  })
  @ApiParam({
    name: '/signout',
    description: 'signing out a user',
    type: String,
  })
  @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null;
  }
}

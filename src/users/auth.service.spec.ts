import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let mockUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const user: User = {
      id: 1,
      fullName: 'foobar',
      phone: '098934',
      email: 'foo@bar.com',
      password: 'password',
    };

    mockUsersService = {
      createUser: (user: User) => Promise.resolve(user),
      findUserByEmail: (email: string) => Promise.resolve([{ email, ...user }]),
      findUserById: (id: number) => Promise.resolve({ id, ...user }),
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    authService = module.get(AuthService);
  });
  it('should create an instance of auth service', () => {
    expect(authService).toBeDefined();
  });
});

import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

describe('AuthService', () => {
  const user = {
    id: 1,
    fullName: 'foobar',
    phone: '098934',
    email: 'foo@bay.com',
    password: 'password',
  };
  let authService: AuthService;
  const mockUserService = {
    createUser: jest.fn((user) => user),
    findUserByEmail: jest.fn((email: string) =>
      email === user.email ? [user] : [],
    ),
    findUserById: jest.fn((id: string) => {
      return { id, ...user };
    }),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    authService = module.get(AuthService);
  });
  describe('AuthService', () => {
    it('checks if the the auth service is defined', () => {
      expect(authService).toBeDefined();
    });
  });

  describe('signup', () => {
    const fakeUser = {
      id: 1,
      fullName: 'foobar',
      phone: '098934',
      email: 'foo@baek.com',
      password: 'password',
    };
    it('should create a new user with a hashed and salted password', async () => {
      const newUser = await authService.signup(fakeUser);
      expect(newUser.password).not.toEqual(fakeUser.password);
      const [salt, hash] = newUser.password.split('.');
      expect(salt).toBeDefined();
      expect(hash).toBeDefined();
    });

    it('should throw an error if the user already exists', async () => {
      await authService.signup(fakeUser);

      try {
        await authService.signup(fakeUser);
      } catch (err) {
        return;
      }
    });
  });
});

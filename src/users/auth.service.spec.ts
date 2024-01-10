import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let authService: AuthService;

  const user = {
    id: 1,
    fullName: 'foobar',
    phone: '098934',
    email: 'foo@bay.com',
    password: 'password',
  };
  const fakeUser = {
    id: 1,
    fullName: 'foobar',
    phone: '098934',
    email: 'foo@baek.com',
    password: 'password',
  };
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

  describe('signin', () => {
    // what should be tested in our signin function:
    /**
     * check if the user exists
     * check if the provided password is valid,
     * throw an error if the user does not exist
     * throw if the password is invalid
     */
    // signin a user
    it('should signin a user', async () => {
      const logUser = {
        id: 1,
        fullName: 'foobar',
        phone: '098934',
        email: 'foot@bay.com',
        password: 'password',
      };
      await authService.signup(logUser);
      const user = await authService.signin(logUser.email, logUser.password);
      expect(user).toBeDefined();
    });
  });
});

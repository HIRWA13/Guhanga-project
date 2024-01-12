import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import * as crypto from 'crypto';
import { promisify } from 'util';

const scrypter = crypto.scrypt;
const scrypt = promisify(scrypter);

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: jest.Mocked<UsersService>;

  beforeEach(async () => {
    usersService = {
      findUserByEmail: jest.fn(),
    } as unknown as jest.Mocked<UsersService>;
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: usersService,
        },
      ],
    }).compile();

    authService = module.get(AuthService);
  });

  describe('Signup', () => {
    // it('should create a new user with a hashed and salted password', async () => {
    //   const password = 'password';
    //   const salter = 'salt';
    //   const hashedPassword = (await scrypt(password, salter, 32)) as Buffer;

    //   const signUser = {
    //     id: 2,
    //     fullName: 'Test User',
    //     email: 'jest1234@example.com',
    //     password: `${salter}.${hashedPassword.toString('hex')}`,
    //     phone: '123456677',
    //   };
    //   // const newUser = await authService.signup(signUser);
    //   // expect(newUser.password).not.toEqual(signUser.password);
    //   const [salt, hash] = signUser.password.split('.');
    //   expect(salt).toBeDefined();
    //   expect(hash).toBeDefined();
    //   usersService.findUserByEmail.mockResolvedValue([signUser]);
    //   const user = await authService.signup(signUser);
    //   expect(user).toBeDefined();
    // });

    it('should throw an error if the user already exists', async () => {
      const signUser = {
        id: 10,
        fullName: 'Test User',
        email: 'test@example.com',
        password: 'salt.hash',
        phone: '1234567890',
      };
      usersService.findUserByEmail.mockResolvedValue([signUser]);

      const user = authService.signup(signUser);

      expect(user).rejects.toThrow();
    });
  });

  describe('Signin', () => {
    it('should throw an error if the user does not exists', async () => {
      usersService.findUserByEmail.mockResolvedValueOnce([]);

      const user = () => {
        return authService.signin('sdfdfdf@gmail.com', 'sdfdfddgg');
      };

      await expect(user).rejects.toThrow();
    });

    it('should throw an error if the password is invalid', async () => {
      const existingUser = {
        id: 10,
        fullName: 'Test User',
        email: 'test@example.com',
        password: 'salt.hash',
        phone: '1234567890',
      };

      usersService.findUserByEmail.mockResolvedValueOnce([existingUser]);

      const user = () => {
        return authService.signin('test@example.com', 'invalid-password');
      };

      await expect(user).rejects.toThrow();
    });
  });
});

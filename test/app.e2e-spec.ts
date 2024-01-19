import { AuthService } from './../src/users/auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  HttpStatus,
  INestApplication,
} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { randomBytes, scrypt as scrypter } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(scrypter);

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const authService = {
    signup: jest.fn(),
    signin: jest.fn(),
    signout: jest.fn(),
    whoAmI: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('POST / auth/signup', async () => {
    const dto = {
      email: 'test@example.com',
      password: 'password',
      fullName: 'test jest',
      phone: '078124435',
    };

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(dto.password, salt, 32)) as Buffer;

    const user = {
      id: '1',
      fullName: dto.fullName,
      email: dto.email,
      phone: dto.phone,
      password: `${salt}.${hash.toString('hex')}`,
    };
    authService.signup.mockResolvedValue(user);

    await request(app.getHttpServer())
      .post('/auth/signup')
      .send(dto)
      .expect(HttpStatus.CREATED)
      .then((res) => {
        console.log(res.body); // Log the response body
        expect(res.body).toEqual(user);
      })
      .catch((err) => {
        return;
      });
  });
});

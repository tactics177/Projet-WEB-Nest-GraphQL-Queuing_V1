import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn(),
            createUser: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return access token for valid user', async () => {
      const user = { id: '1', username: 'test', password: 'hashedpassword' };
      jest.spyOn(jwtService, 'sign').mockReturnValue('signedToken');

      const result = await service.login(user);
      expect(result).toEqual({
        access_token: 'signedToken',
        username: 'test',
      });
    });
  });

  describe('comparePasswords', () => {
    it('should return true if passwords match', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const result = await bcrypt.compare('password', 'hashedpassword');
      expect(result).toBe(true);
    });

    it('should return false if passwords do not match', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      const result = await bcrypt.compare('password', 'wronghashedpassword');
      expect(result).toBe(false);
    });
  });

  describe('validateUser', () => {
    it('should return user data if credentials are valid', async () => {
      const user = { id: '1', username: 'test', password: 'hashedpassword' };
      jest.spyOn(userService, 'findOne').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const result = await service.validateUser('test', 'password');
      expect(result).toEqual({ id: '1', username: 'test' });
    });

    it('should return null if user is not found', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(null);

      const result = await service.validateUser('test', 'password');
      expect(result).toBeNull();
    });

    it('should return null if password is invalid', async () => {
      const user = { id: '1', username: 'test', password: 'hashedpassword' };
      jest.spyOn(userService, 'findOne').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      const result = await service.validateUser('test', 'password');
      expect(result).toBeNull();
    });
  });
});

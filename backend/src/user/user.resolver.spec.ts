import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { User } from './user.model';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const user: User = { id: '1', username: 'testuser', password: 'testpass' };
      jest.spyOn(service, 'createUser').mockResolvedValue(user);

      const result = await resolver.createUser('testuser', 'testpass');
      expect(result).toEqual(user);
      expect(service.createUser).toHaveBeenCalledWith('testuser', 'testpass');
    });
  });

  describe('users', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        { id: '1', username: 'testuser1', password: 'testpass1' },
        { id: '2', username: 'testuser2', password: 'testpass2' },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(users);

      const result = await resolver.users();
      expect(result).toEqual(users);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});

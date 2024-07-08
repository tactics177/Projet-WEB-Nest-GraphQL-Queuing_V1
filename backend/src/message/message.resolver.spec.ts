import { Test, TestingModule } from '@nestjs/testing';
import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { Message } from './message.model';
import { User } from '../user/user.model';

const mockGqlAuthGuard = {
  canActivate: jest.fn((context: ExecutionContext) => true),
};

describe('MessageResolver', () => {
  let resolver: MessageResolver;
  let service: MessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageResolver,
        {
          provide: MessageService,
          useValue: {
            createMessage: jest.fn(),
            getMessages: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(GqlAuthGuard)
      .useValue(mockGqlAuthGuard)
      .compile();

    resolver = module.get<MessageResolver>(MessageResolver);
    service = module.get<MessageService>(MessageService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createMessage', () => {
    it('should create a message', async () => {
      const message: Message = {
        id: '1',
        content: 'Hello',
        conversationId: '1',
        user: {
          id: '1',
          username: 'testuser',
          password: 'hashedpassword',
        } as User,
      };
      jest.spyOn(service, 'createMessage').mockResolvedValue(message);

      const result = await resolver.createMessage(
        { username: 'testuser' },
        'Hello',
        '1',
      );
      expect(result).toEqual(message);
      expect(service.createMessage).toHaveBeenCalledWith(
        'testuser',
        'Hello',
        '1',
      );
    });
  });

  describe('getMessages', () => {
    it('should return an array of messages', async () => {
      const messages: Message[] = [
        {
          id: '1',
          content: 'Hello',
          conversationId: '1',
          user: {
            id: '1',
            username: 'testuser',
            password: 'hashedpassword',
          } as User,
        },
        {
          id: '2',
          content: 'Hi',
          conversationId: '1',
          user: {
            id: '1',
            username: 'testuser',
            password: 'hashedpassword',
          } as User,
        },
      ];
      jest.spyOn(service, 'getMessages').mockResolvedValue(messages);

      const result = await resolver.getMessages({ username: 'testuser' }, '1');
      expect(result).toEqual(messages);
      expect(service.getMessages).toHaveBeenCalledWith('testuser', '1');
    });
  });
});

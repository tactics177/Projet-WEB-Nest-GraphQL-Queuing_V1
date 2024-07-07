import { Test, TestingModule } from '@nestjs/testing';
import { ConversationResolver } from './conversation.resolver';
import { ConversationService } from './conversation.service';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { Conversation } from './conversation.model';
import { User } from '../user/user.model';

const mockGqlAuthGuard = {
  canActivate: jest.fn((context: ExecutionContext) => true),
};

describe('ConversationResolver', () => {
  let resolver: ConversationResolver;
  let service: ConversationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConversationResolver,
        {
          provide: ConversationService,
          useValue: {
            createConversation: jest.fn(),
            getConversations: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(GqlAuthGuard)
      .useValue(mockGqlAuthGuard)
      .compile();

    resolver = module.get<ConversationResolver>(ConversationResolver);
    service = module.get<ConversationService>(ConversationService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createConversation', () => {
    it('should create a conversation', async () => {
      const conversation: Conversation = {
        id: '1',
        users: [
          { id: '1', username: 'user1', password: 'hashedpassword1' } as User,
          { id: '2', username: 'user2', password: 'hashedpassword2' } as User,
        ],
      };
      jest.spyOn(service, 'createConversation').mockResolvedValue(conversation);

      const result = await resolver.createConversation('user1', 'user2');
      expect(result).toEqual(conversation);
      expect(service.createConversation).toHaveBeenCalledWith('user1', 'user2');
    });
  });

  describe('getConversations', () => {
    it('should return an array of conversations', async () => {
      const conversations: Conversation[] = [
        {
          id: '1',
          users: [
            { id: '1', username: 'user1', password: 'hashedpassword1' } as User,
            { id: '2', username: 'user2', password: 'hashedpassword2' } as User,
          ],
        },
        {
          id: '2',
          users: [
            { id: '1', username: 'user1', password: 'hashedpassword1' } as User,
            { id: '3', username: 'user3', password: 'hashedpassword3' } as User,
          ],
        },
      ];
      jest.spyOn(service, 'getConversations').mockResolvedValue(conversations);

      const result = await resolver.getConversations({ username: 'user1' }, 'user1');
      expect(result).toEqual(conversations);
      expect(service.getConversations).toHaveBeenCalledWith('user1');
    });
  });
});

import {Injectable} from '@nestjs/common';
import {Message} from './message.model';
import {PrismaService} from "../prisma.service";

@Injectable()
export class MessageService {
    constructor(private prisma: PrismaService) {
    }

    async createMessage(username : string, content : string, conversationId: string): Promise<Message>{
        const createdMessage = await this.prisma.message.create({
            data: {
                content: content,
                user: {
                    connect: {
                        username: username
                    }
                },
                conversation: {
                    connect: {
                        id: conversationId
                    }
                }
            }, include: {
                user: true
            }
        })
        const {userId, ...rest} = createdMessage;
        return createdMessage;
    }

    async getMessages(conversationId: string): Promise<Message[]>{
        const messages = await this.prisma.message.findMany({
            where: {
                conversationId: conversationId
            },
            include: {
                user: true
            }
        });
        return messages;
    }
}

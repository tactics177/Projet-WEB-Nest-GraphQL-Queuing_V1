import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma.service";
import {Conversation} from "./conversation.model";

@Injectable()
export class ConversationService {
    constructor(private prisma: PrismaService) {
    }

    async createConversation(username1: string, username2: string): Promise<Conversation> {
        const createdConversation = await this.prisma.conversation.create({
            data: {
                users: {
                    connect: [{username: username1}, {username: username2}]
                }
            }, include: {
                users: true
            }
        })
        const conversationExists = await this.prisma.conversation.findFirst({
            where: {
                AND: [
                    {users: {some: {username: username1}}},
                    {users: {some: {username: username2}}}
                ]
            }
        })
        if (conversationExists) {
            throw new Error('Conversation already exists');
        } 
        return createdConversation;
    }

    async getConversation(username1: string): Promise<Array<{ id: string }>> {
        const conversations = await this.prisma.conversation.findMany({
            where: {
                users: {
                    some: {
                        username: username1
                    }
                }
            }, include: {
                users: true
            }
        });
        return conversations;
    }
}
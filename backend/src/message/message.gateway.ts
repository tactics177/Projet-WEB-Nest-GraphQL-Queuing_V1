import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(MessageGateway.name);

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() conversationId: string, @ConnectedSocket() client: Socket): void {
    client.join(conversationId);
    this.logger.log(`Client ${client.id} joined room ${conversationId}`);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() message: string): void {
    this.logger.log(`Message received: ${message}`);
    // Handle the incoming message if needed
  }

  notifyNewMessage(conversationId: string, message: any) {
    this.server.to(conversationId).emit('newMessage', message);
    this.logger.log(`Message sent to room ${conversationId}: ${JSON.stringify(message)}`);
  }
}

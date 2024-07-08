import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

/**
 * WebSocket gateway for handling client connections and messages.
 */
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(MessageGateway.name);

  /**
   * Handles the connection of a client.
   * @param client - The connected socket client.
   */
  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  /**
   * Handles the disconnection of a client.
   * @param client - The disconnected socket client.
   */
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  /**
   * Handles the 'joinRoom' event when a client joins a room.
   * @param conversationId - The ID of the conversation/room to join.
   * @param client - The connected socket client.
   */
  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() conversationId: string, @ConnectedSocket() client: Socket): void {
    client.join(conversationId);
    this.logger.log(`Client ${client.id} joined room ${conversationId}`);
  }

  /**
   * Handles the 'sendMessage' event when a client sends a message.
   * @param message - The message sent by the client.
   */
  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() message: string): void {
    this.logger.log(`Message received: ${message}`);
    // Handle the incoming message if needed
  }

  /**
   * Notifies all clients in a room about a new message.
   * @param conversationId - The ID of the conversation/room to notify.
   * @param message - The new message to send.
   */
  notifyNewMessage(conversationId: string, message: any) {
    this.server.to(conversationId).emit('newMessage', message);
    this.logger.log(`Message sent to room ${conversationId}: ${JSON.stringify(message)}`);
  }
}

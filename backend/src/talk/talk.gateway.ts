import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import {
  ServerToClientEvents,
  ClientToServerEvents,
  Message,
} from '../interfaces/talk.interface'
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', 
  }, transports: ['websocket'],
})

export class TalkGateway {
  @WebSocketServer() server: Server = new Server<
  ServerToClientEvents,
  ClientToServerEvents
  >();
  private logger = new Logger('TalkGateway');

  @SubscribeMessage('talk')
  async handleEvent(
    @MessageBody()
    payload: Message,
  ): Promise<Message> {
    console.log("EU SOU A MENSAGEM:" + payload);
    this.logger.log(payload);
    this.server.emit('talk', payload); //broadcast messages
    return payload;
  }
}
 
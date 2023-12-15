import { Message } from '../interfaces/talk.interface';
import { Server } from 'socket.io';
export declare class TalkGateway {
    server: Server;
    private logger;
    handleEvent(payload: Message): Promise<Message>;
}

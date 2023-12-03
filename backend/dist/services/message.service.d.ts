import { Repository } from 'typeorm';
import Message from 'src/entitys/message.entity';
import User from 'src/entitys/user.entity';
import Channel from 'src/entitys/channel.entity';
export declare class MessageService {
    private messageRepo;
    constructor(messageRepo: Repository<Message>);
    messageCreate(senderUser: User, msgContent: string, msgChannel: Channel): Promise<any>;
}

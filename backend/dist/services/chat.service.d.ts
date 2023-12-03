import Channel from 'src/entitys/channel.entity';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { MessageService } from './message.service';
export declare class ChatService {
    private chatRepo;
    private userService;
    private messageService;
    constructor(chatRepo: Repository<Channel>, userService: UserService, messageService: MessageService);
    findById(id: string): Promise<Channel>;
    findByDisplayName(displayName: string): Promise<any>;
    createChannel(displayName: string, avatar: string, members: string[], creator: string, type: 'personal' | 'private' | 'public'): Promise<any>;
    GetAllChannelsFromDB(): Promise<any>;
    addMessageToChannel(displayName: string, content: string, sender: string): Promise<any>;
}

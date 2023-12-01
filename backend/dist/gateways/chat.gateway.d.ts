import { Server } from 'socket.io';
import Channel from 'src/entitys/channel.entity';
import Message from 'src/entitys/message.entity';
import User from 'src/entitys/user.entity';
import { ChatService } from 'src/services/chat.service';
import { UserService } from 'src/services/user.service';
export declare class ChatGateway {
    private userService;
    private chatService;
    constructor(userService: UserService, chatService: ChatService);
    server: Server;
    private logger;
    sendMessage(data: {
        channel: string;
        userName: string;
        content: string;
    }): Promise<Message>;
    getUserChannels(userName: string): Promise<Channel[]>;
    createChannel(data: {
        creator: string;
        displayName: string;
        avatar: string;
        members: string[];
        type: 'personal' | 'private' | 'public';
    }): Promise<Channel>;
    getUserFriends(userName: string): Promise<string[]>;
    getAllUsers(): Promise<User[]>;
    addFriendToUser(data: {
        friend: string;
        currentUser: string;
    }): Promise<string[]>;
    removeFriendToUser(data: {
        friend: string;
        currentUser: string;
    }): Promise<string[]>;
    addingMembers(data: {
        type: 'add' | 'rmv';
        member: string;
    }): Promise<string[]>;
    getChannelMessages(data: {
        channel: string;
        userName: string;
    }): Promise<Message[]>;
}

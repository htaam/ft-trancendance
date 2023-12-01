import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import Channel from 'src/entitys/channel.entity';
import Message from 'src/entitys/message.entity';
import User from 'src/entitys/user.entity';
import { ChatService } from 'src/services/chat.service';
import { UserService } from 'src/services/user.service';

let backendMembers = [''];

@WebSocketGateway({ cors: { origin: 'http://localhost:5173' } })
export class ChatGateway {
  constructor(
    private userService: UserService,
    private chatService: ChatService,
  ) {}
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('Gateway Log');

  @SubscribeMessage('sendMessage')
  async sendMessage(
    @MessageBody()
    data: {
      channel: string;
      userName: string;
      content: string;
    },
  ): Promise<Message> {
    console.log('webScoket: frontend asked to send message');
    if (data.content == '') {
      throw new HttpException(
        'sendMessage: empty message',
        HttpStatus.FORBIDDEN,
      );
    }
    const channel = await this.chatService.findByDisplayName(data.channel);
    if (!channel) {
      throw new HttpException(
        'sendMessage: channel not found',
        HttpStatus.NOT_FOUND,
      );
    }
    const user = await this.userService.findByUsername(data.userName);
    if (!user) {
      throw new HttpException(
        'sendMessage: user not found',
        HttpStatus.NOT_FOUND,
      );
    }
    let userIsMembers = 0;
    for (let i = 0; i < channel.members.length; i++) {
      if (channel.members[i].userName == user.userName) userIsMembers = 1;
    }
    if (userIsMembers == 0) return;
    const newMessage = await this.chatService.addMessageToChannel(
      data.channel,
      data.content,
      data.userName,
    );
    return newMessage;
  }

  @SubscribeMessage('getUserChannels')
  async getUserChannels(@MessageBody() userName: string): Promise<Channel[]> {
    console.log(
      `webScoket: frontend asked for user channels. User: ${userName}`,
    );
    const user = await this.userService.findByUsername(userName);
    if (user && user.channels) return user.channels;
  }

  @SubscribeMessage('createChannel')
  async createChannel(
    @MessageBody()
    data: {
      creator: string;
      displayName: string;
      avatar: string;
      members: string[];
      type: 'personal' | 'private' | 'public';
    },
  ): Promise<Channel> {
    console.log(
      `webScoket: frontend asked to creat a channel: {\n\tData:\n\t\tcreator: ${data.creator}\n\t\tdisplayName: ${data.displayName}\n\t\tavatar: ${data.avatar}\n\t\tmembers: ${data.members}}`,
    );
    if (data.creator.length < 1) return;
    const newChannel = await this.chatService.createChannel(
      data.displayName,
      data.avatar,
      data.members,
      data.creator,
      data.type,
    );
    return newChannel;
  }

  @SubscribeMessage('getUserFriends')
  async getUserFriends(
    @MessageBody()
    userName: string,
  ): Promise<string[]> {
    console.log(`webScoket: frontend asked for user ${userName} friends`);
    const user = await this.userService.findByUsername(userName);
    if (!user) return [];
    return user.friends;
  }

  @SubscribeMessage('getAllUsers')
  async getAllUsers(): Promise<User[]> {
    console.log(`webScoket: frontend asked for all users`);
    return await this.userService.GetAllUsersFromDB();
  }

  @SubscribeMessage('addFriend')
  async addFriendToUser(
    @MessageBody() data: { friend: string; currentUser: string },
  ): Promise<string[]> {
    console.log(`webScoket: frontend asked to add friend to user friends list`);
    if (!data.friend || !data.friend) return [];
    const user = await this.userService.findByUsername(data.currentUser);
    if (!user) return [];
    for (let i = 0; i < user.friends.length; i++) {
      if (data.friend == user.friends[i]) return user.friends;
    }
    this.userService.addUserToFriendsList(data.currentUser, data.friend);
    return user.friends;
  }

  @SubscribeMessage('removeFriend')
  async removeFriendToUser(
    @MessageBody() data: { friend: string; currentUser: string },
  ): Promise<string[]> {
    console.log(
      `webScoket: frontend asked to remove friend from user friends list`,
    );
    if (!data.friend || !data.friend) return [];
    const user = await this.userService.findByUsername(data.currentUser);
    if (!user) return [];
    let exists = 0;
    for (let i = 0; i < user.friends.length; i++) {
      if (data.friend == user.friends[i]) exists = 1;
    }
    if (!exists) return user.friends;
    this.userService.removeUserToFriendsList(data.currentUser, data.friend);
    return user.friends;
  }

  @SubscribeMessage('addingMembers')
  async addingMembers(
    @MessageBody() data: { type: 'add' | 'rmv'; member: string },
  ): Promise<string[]> {
    console.log(
      `frontend asked to add user to possible channel member; type: ${data.type}; member: ${data.member}`,
    );
    if (data.type == 'add') backendMembers.push(data.member);
    else if (data.type == 'rmv') {
      const index = backendMembers.indexOf(data.member, 0);
      if (index > -1) backendMembers.splice(index, 1);
    }
    return backendMembers;
  }

  @SubscribeMessage('getChannelMessages')
  async getChannelMessages(
    @MessageBody() data: { channel: string; userName: string },
  ): Promise<Message[]> {
    console.log(
      `frontend asked for channel ${data.channel} messages; user that asked: ${data.userName}`,
    );
    const user = await this.userService.findByUsername(data.userName);
    if (!user) return [];
    const channel = await this.chatService.findByDisplayName(data.channel);
    if (!channel) return [];
    let userIsMember = false;
    channel.members.map((member: User) => {
      if (member.userName == data.userName) userIsMember = true;
    });
    if (userIsMember == false) return [];
    return channel.history;
  }
}

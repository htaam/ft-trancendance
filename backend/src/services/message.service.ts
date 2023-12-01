import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Message from 'src/entitys/message.entity';
import User from 'src/entitys/user.entity';
import Channel from 'src/entitys/channel.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepo: Repository<Message>,
  ) {}

  async messageCreate(
    senderUser: User,
    msgContent: string,
    msgChannel: Channel,
  ) {
    const message = this.messageRepo.create({
      date: Date(),
      sender: senderUser,
      content: msgContent,
      channel: msgChannel,
    });
    this.messageRepo.save(message);
    return message;
  }
}

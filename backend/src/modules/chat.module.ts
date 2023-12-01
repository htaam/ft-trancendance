import { Module, forwardRef } from '@nestjs/common';
import { ChatGateway } from '../gateways/chat.gateway';
import { UserModule } from './user.module';
import { ChatService } from 'src/services/chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Channel from 'src/entitys/channel.entity';
import { MessageModule } from './message.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Channel]),
    forwardRef(() => UserModule),
    forwardRef(() => MessageModule),
  ],
  providers: [ChatGateway, ChatService],
  controllers: [],
  exports: [ChatService],
})
export class ChatModule {}

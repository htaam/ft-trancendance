import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Message from 'src/entitys/message.entity';
import { MessageService } from 'src/services/message.service';
import { ChatModule } from './chat.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [MessageService],
  controllers: [],
  exports: [MessageService],
})
export class MessageModule {}

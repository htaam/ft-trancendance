import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as cors from 'cors'; // Import the cors middleware
import { UserModule } from './modules/user.module';
import { AuthModule } from './modules/auth.module';
import { DatabaseModule } from './modules/database.module';
import { ChatModule } from './modules/chat.module';
import { MessageModule } from './modules/message.module';
import { GameModule } from './modules/game.module';
import { TalkModule } from './talk/talk.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    ChatModule,
    MessageModule,
    GameModule,
    TalkModule,
    RoomModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  // Use the configure method to enable CORS
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors())
      .forRoutes({ path: '/auth/42', method: RequestMethod.ALL }); // Adjust the route path accordingly
  }
}
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './controllers/user.controller';
import { UserModule } from './modules/user.module';
import { AuthModule } from './modules/auth.module';
import { DatabaseModule } from './modules/database.module';
import JwtStrategy from './auth/jwtauth/jwt.strategy';
import { ChatModule } from './modules/chat.module';
import { MessageModule } from './modules/message.module';
import { GameModule } from './modules/game.module';
import { CatsModule } from './cats/cats.module';
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path';
import { TalkGateway } from './talk/talk.gateway';
import { TalkModule } from './talk/talk.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..',',,', 'dist', 'client'),
    }),
    UserModule,
    AuthModule,
    ChatModule,
    MessageModule,
    GameModule,
    CatsModule,
    TalkModule,
    RoomModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}

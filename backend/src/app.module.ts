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

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    ChatModule,
    MessageModule,
    GameModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}

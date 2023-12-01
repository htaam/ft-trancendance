import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Channel from 'src/entitys/channel.entity';
import Message from 'src/entitys/message.entity';
import User from 'src/entitys/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        username: configService.get('POSTGRES_USER'),
        port: configService.get('POSTGRES_PORT'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        entities: [User, Channel, Message],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}

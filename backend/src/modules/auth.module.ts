import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user.module';
import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { LocalStrategy } from '../auth/local.strategy';
import { PassportModule } from '@nestjs/passport';
import JwtStrategy from 'src/auth/jwtauth/jwt.strategy';
import {Auth42Module} from "../auth/42auth/42auth.module";
import {HttpModule} from "@nestjs/axios";

@Module({
imports: [UserModule,HttpModule ,Auth42Module ,PassportModule, ConfigModule, JwtModule.registerAsync({
		imports: [ConfigModule],
		inject: [ConfigService],
		useFactory: async(configService: ConfigService) => ({
			secret: configService.get('JWT_SECRET'),
			signOptions: {
				expiresIn: `${configService.get("JWT_EXIRATION_TIME")}s`,
				},
			}),
		}),
	],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import User from 'src/entitys/user.entity';
import { UserService } from 'src/services/user.service';
import UserRegisterDto from 'src/dtos/user-register.dto';
import { Response } from 'express';
import { HttpService } from '@nestjs/axios';
export declare class AuthService {
    private usersService;
    private jwtService;
    private readonly configService;
    private readonly httpService;
    constructor(usersService: UserService, jwtService: JwtService, configService: ConfigService, httpService: HttpService);
    register(registerData: UserRegisterDto): Promise<User>;
    getAutenticatedUser(userName: string, decryptedPassword: string): Promise<User>;
    private verifyPassword;
    getJwtToken(user: User): string;
    getCookieWithJwtToken(user: User): string;
    getCookieForLogout(): string;
    redirectUserAuth(response: Response, hash: string): Promise<void>;
    downloadImage(url: string): Promise<string>;
    generateTwoFactorAuthenticationSecret(user: User): Promise<{
        secret: string;
        otpauthUrl: string;
    }>;
    isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string, user: User): boolean;
    loginWith2fa(userWithoutPsw: Partial<User>): Promise<{
        email: string;
        access_token: string;
    }>;
}

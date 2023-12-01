import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import User from 'src/entitys/user.entity';
import { UserService } from 'src/services/user.service';
import TokenPayload from '../interfaces/token-payload.i';
import * as bcrypt from 'bcrypt';
import UserRegisterDto from 'src/dtos/user-register.dto';
import { Response } from 'express';
import { HttpService } from '@nestjs/axios';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as process from 'process';
import { authenticator } from 'otplib';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  //Encrypting password and creating user
  async register(registerData: UserRegisterDto) {
    try {
      const encryptedPassword = await bcrypt.hash(registerData.password, 12);
      const user = await this.usersService.create({
        userName: registerData.userName,
        displayName: registerData.userName,
        email: registerData.email,
        password: encryptedPassword,
        passwordRepeat: '',
        is2FOn: false,
        secret2F: 'undefine',
        avatar: 'notset',
        elo: 800,
        chat: [],
        blocked: [],
        friends: [],
        msgHist: '',
        idWebSocket: '',
        gameNumber: 0,
        gameWin: 0,
        gameLose: 0,
        winLoseRate: '',
        totalPointGet: 0,
        totalPointTake: 0,
        pointGetTakeRate: '',
        winStreak: 0,
        gameHist: '',
        xp: 0,
        totalGame: 0,
        socketID: '',
        slot: 0,
        isActive: false,
      });
      user.password = undefined;
      return user;
    } catch (e) {
      if (e?.code === 23505) {
        throw new HttpException(
          'Username is already registered!',
          HttpStatus.BAD_REQUEST,
        );
      }
      console.log(e);
      throw new HttpException(
        'Error during registration request!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //get user information verify given data information
  public async getAutenticatedUser(
    userName: string,
    decryptedPassword: string,
  ) {
    try {
      const user = await this.usersService.findByUsername(userName);
      await this.verifyPassword(decryptedPassword, user.password);
      user.password = undefined;
      return user;
    } catch (e) {}
  }

  //verify if the password is valid
  private async verifyPassword(
    decryptedPassword: string,
    encryptedPassword: string,
  ) {
    const arePasswordMatching = await bcrypt.compare(
      decryptedPassword,
      encryptedPassword,
    );
    if (!arePasswordMatching) {
      throw new HttpException(
        'The credentials are not valid!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // get json token
  public getJwtToken(user: User) {
    const payload: TokenPayload = { user };
    return this.jwtService.sign(payload);
  }

  // get cookies to preload information
  public getCookieWithJwtToken(user: User) {
    const payload: TokenPayload = { user };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; SameSite=none; Domain: 51.254.37.204; HttpOnly; Path=/; Secure; Max-Age=3600`;
  }

  public getCookieForLogout() {
    return 'Authentication=; HttpOnly; Path=/; Max-Age:0';
  }

  //redirect user to authenticate using 2fa
  async redirectUserAuth(@Res() response: Response, hash: string) {
    const hash64 = Buffer.from(hash, 'binary').toString('base64');
    response.redirect(301, process.env.SITE_URL + `:3000/auth/2fa/${hash64}`);
  }

  async downloadImage(url: string) {
    const imgLink: string = `/images/user-image/${uuidv4()}.png` as string;
    const writer = fs.createWriteStream(process.cwd() + imgLink);

    const response = await this.httpService.axiosRef({
      url: url,
      method: 'GET',
      responseType: 'stream',
    });

    response.data.pipe(writer);
    return imgLink;
  }

  //generate 2fa secret used as key, in 2fa you need to have 2 keys to autenthicate
  async generateTwoFactorAuthenticationSecret(user: User) {
    const secret = authenticator.generateSecret();

    const otpauthUrl = authenticator.keyuri(
      user.email,
      'ft_transcendence',
      secret,
    );

    await this.usersService.setTwoFactorAuthenticationSecret(secret, user.id);
    return {
      secret,
      otpauthUrl,
    };
  }

  //verify if the given keys are valid
  isTwoFactorAuthenticationCodeValid(
    twoFactorAuthenticationCode: string,
    user: User,
  ) {
    return authenticator.verify({
      token: twoFactorAuthenticationCode,
      secret: user.secret2F,
    });
  }

  async loginWith2fa(userWithoutPsw: Partial<User>) {
    const payload = {
      userName: userWithoutPsw.userName,
      isTwoFactorAuthenticationEnabled: !!userWithoutPsw.is2FOn,
      isTwoFactorAuthenticated: true,
    };
    return {
      email: payload.userName,
      access_token: this.jwtService.sign(payload),
    };
  }
}

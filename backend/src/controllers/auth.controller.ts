import { AuthService } from '../services/auth.service';
import {
  Controller,
  HttpCode,
  Post,
  Body,
  UseGuards,
  Session,
  Req,
  Res,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import RequestWithUser from '../interfaces/request-with-user.i';
import { Response } from 'express';
import JwtAuthGuard from '../auth/jwtauth/jwt-auth.guard';
import UserRegisterDto from 'src/dtos/user-register.dto';
import { Auth42Service } from '../auth/42auth/42auth.service';
import { UserService } from 'src/services/user.service';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { FortyTwoAuthGuard } from 'src/auth/42auth/42auth.guard';
import { PassThrough } from 'stream';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private auth42Service: Auth42Service,
    private userService: UserService,
  ) {}

  @Get('callback')
  async callback(@Query('code') code: string, @Res() res): Promise<void> {
    try {
      const domain = "api.intra.42.fr/oauth";
      const grant_type = "authorization_code";
      const client_id = "u-s4t2ud-5c1567ba9e786c33b15f2eb8f6919213808601f5859cf72aa525de7cae7f4597";
      const client_secret = "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";
      const redirect_uri = "http://localhost:5173/auth/callback";

      const tokenResponse = await fetch(
        `https://${domain}/token?` +
        `grant_type=${grant_type}&` +
        `client_id=${client_id}&` +
        `client_secret=${client_secret}&` +
        `code=${code}&` +
        `redirect_uri=${redirect_uri}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "manual"
        }
      );

      if (tokenResponse.ok) {
        const tokenResult = await tokenResponse.json();
        // Handle the token result as needed (e.g., store in a database, respond to the client, etc.)
        console.log("BACK Token Result:", tokenResult);
        res.status(HttpStatus.OK).json(tokenResult);
      } else {
        console.error('BACK Failed to get token:', tokenResponse.status, tokenResponse.statusText);
        throw new HttpException(tokenResponse.statusText, tokenResponse.status);
      }
    } catch (error) {
      console.error('BACK Error during token request:', error);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('42')
  @UseGuards(FortyTwoAuthGuard)
  fortyTwoAuth(
    @Req() req,
    @Session() session,
    @Res({ passthrough: true }) res,
  ) {
    return this.authService.fortyTwoAuth(req, session, res);
  }

  @Post('register')
  async register(@Body() registrationData: UserRegisterDto) {
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const hash = await bcrypt.hash(user.id, 10);
    const rep = {
      ...user,
      hash: Buffer.from(hash, 'binary').toString('base64'),
    };
    return response.send(rep);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logOut(@Req() _request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogout());
    response.send();
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get('logcheck')
  async logcheck(@Req() request: RequestWithUser, @Res() response: Response) {
    return response.send(request.user);
  }

  // @Get('callback')
  // async handleToken(@Req() request: Request, @Res() response: Response) {
  //   const code: string = request['query'].code as string;
  //   const token = await this.auth42Service.accessToken(code);
  //   const userInformation = await this.auth42Service.getUserInformation(
  //     token['access_token'],
  //   );
  //   try {
  //     const user = await this.userService.findByUsername(
  //       userInformation['login'],
  //     );
  //     const hash = await bcrypt.hash(user.id, 10);
  //     await this.authService.redirectUserAuth(response, hash);
  //   } catch (e) {
  //     const linkImg = await this.authService.downloadImage(
  //       userInformation['image']['link'] as string,
  //     );
  //     const newUser: UserRegisterDto = {
  //       userName: userInformation['login'],
  //       password: process.env.PW_42AUTH,
  //       passwordRepeat: process.env.PW_42AUTH,
  //       email: userInformation['email'],
  //       avatar: linkImg as string,
  //       is2FOn: false,
  //       secret2F: 'notset',
  //       displayName: userInformation['login'],
  //       elo: 800,
  //       blocked: [],
  //       chat: [],
  //       friends: [],
  //       msgHist: '',
  //       idWebSocket: '',
  //       gameNumber: 0,
  //       gameWin: 0,
  //       gameLose: 0,
  //       winLoseRate: '',
  //       totalPointGet: 0,
  //       totalPointTake: 0,
  //       pointGetTakeRate: '',
  //       winStreak: 0,
  //       gameHist: '',
  //       xp: 0,
  //       totalGame: 0,
  //       socketID: '',
  //       slot: 0,
  //       isActive: false,
  //     };
  //     await this.authService.register(newUser);
  //     const user = await this.userService.findByUsername(
  //       userInformation['login'],
  //     );
  //     const hash = await bcrypt.hash(user.id, 10);
  //     await this.userService.updateImage(user.id, linkImg as string);
  //     await this.authService.redirectUserAuth(response, hash);
  //   }
  // }

  @Post('2fa/turn-on')
  @UseGuards(JwtAuthGuard)
  async turnOnTwoFactorAuthentication(@Req() request, @Body() body) {
    const userUp = await this.userService.findById(request.user.id);
    const isCodeValid = this.authService.isTwoFactorAuthenticationCodeValid(
      body.twoFactorAuthenticationCode as string,
      userUp,
    );
    if (!isCodeValid) {
      throw new HttpException(
        'Wrong authentication code',
        HttpStatus.UNAUTHORIZED,
      );
    }
    await this.userService.turnOnTwoFactorAuthentication(request.user.id);
  }

  @Post('2fa/authenticate')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async authenticate(@Req() request, @Body() body) {
    const userUp = await this.userService.findById(request.user.id);
    const isCodeValid = this.authService.isTwoFactorAuthenticationCodeValid(
      body.twoFactorAuthenticationCode,
      userUp,
    );

    if (!isCodeValid) {
      throw new HttpException(
        'Wrong authentication code',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return this.authService.loginWith2fa(request.user);
  }

  @Get('2fa/generate')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async generateQrcode(@Req() request, @Res() response) {
    const url = await this.authService.generateTwoFactorAuthenticationSecret(
      request.user,
    );
    const qrcode = await this.userService.generateQrCodeDataURL(url.otpauthUrl);
    return response.send(qrcode);
  }

  @Post('2fa/login')
  async handle2faToken(
    @Req() request: Request,
    @Res() response: Response,
    @Body() body,
  ) {
    if (!body.uniqueIdentifier)
      throw new HttpException('No hashed param', HttpStatus.UNAUTHORIZED);
    const code = Buffer.from(body.uniqueIdentifier[1], 'base64').toString(
      'binary',
    );
    const userid = await this.userService.FindUserOnDB(code);
    const user = await this.userService.findById(userid);
    const isCodeValid = this.authService.isTwoFactorAuthenticationCodeValid(
      body.twoFactorAuthenticationCode,
      user,
    );
    if (!isCodeValid)
      throw new HttpException(
        'Wrong authentication code',
        HttpStatus.UNAUTHORIZED,
      );
    const cookie = await this.authService.getCookieWithJwtToken(user);
    response.setHeader('Set-Cookie', cookie);
    response.cookie('Authentication', this.authService.getJwtToken(user), {
      httpOnly: true,
      domain: process.env.SITE_NAME,
    });
    return response.send(true);
  }
  @Post('2fa/check-on')
  async user2fa(
    @Req() request: Request,
    @Res() response: Response,
    @Body() body,
  ) {
    if (!body.hash)
      throw new HttpException('No hashed param', HttpStatus.UNAUTHORIZED);
    const code = Buffer.from(body.hash, 'base64').toString('binary');
    const userid = await this.userService.FindUserOnDB(code);
    const user = await this.userService.findById(userid);
    if (user.is2FOn) return response.send(true);
    const cookie = this.authService.getCookieWithJwtToken(user);
    response.setHeader('Set-Cookie', cookie);
    response.cookie('Authentication', this.authService.getJwtToken(user), {
      httpOnly: true,
      domain: process.env.SITE_NAME,
    });
    return response.send(false);
  }
  @Get('2fa/disable')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async disable2fa(@Req() request, @Res() response) {
    const user = await this.userService.findById(request.user.id);
    if (!(await this.userService.turnOffTwoFactorAuthentication(user.id)))
      return response.send(false);
    return response.send(true);
  }
}

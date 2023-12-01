import JwtAuthGuard from 'src/auth/jwtauth/jwt-auth.guard';
import { UserService } from '../services/user.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import {
  ChangeDisplayName,
  ChangeDisplayNameDto,
  UserId,
} from 'src/dtos/user-changedisplay.dto';
import RequestWithUser from 'src/interfaces/request-with-user.i';
import { Response } from 'express';
import { validate } from 'class-validator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as process from 'process';
import * as fs from 'fs';
import { socketId } from 'src/dtos/user-changedisplay.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Get user information.
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get('get-user-information')
  async getuserinformation(
    @Req() request: RequestWithUser,
    @Res() response: Response,
  ) {
    const userData = await this.userService.findById(request.user.id);
    return response.send(userData);
  }

  // Update user displayed name.
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('display-name')
  async changeDisplayName(
    @Req() request: RequestWithUser,
    @Body() newData: ChangeDisplayName,
  ) {
    let ret = {};
    const data: ChangeDisplayNameDto = new ChangeDisplayNameDto();
    data.displayName = newData.displayName;
    await validate(data).then((errors) => {
      if (errors.length > 0) {
        console.log(errors);
        ret = errors;
        return ret;
      }
      ret = data;
    });
    await this.userService.updateDisplayName(request?.user.id, newData);
    return ret;
  }

  // Upload a new image.
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('upload-image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images/userimage',
        filename(
          req,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) {
          const filename: string = uuidv4();
          const extension: string = path.parse(file.originalname).ext;
          callback(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  async uploadFile(@Req() request: RequestWithUser, @UploadedFile() file) {
    if (!request.user || !file) return;
    const userProfile = await this.userService.findById(request.user.id);
    if (userProfile.avatar == 'notset') return;
    fs.unlink(process.cwd() + '/' + userProfile.avatar, (err) => {
      if (err) {
        console.log(err);
      }
    });
    return this.userService.updateImage(request.user.id, file.path);
  }

  // I think a comment here is not so necessary, but, get the user image.
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get('get-user-image')
  async getUserImage(@Req() request: RequestWithUser, @Res() response) {
    if (!request.user)
      throw new HttpException(
        'User image request failed!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    const id: string = await this.userService.getImageId(request.user.id);
    let bitmaps;
    try {
      bitmaps = fs.readFileSync(process.cwd() + '/' + id);
    } catch (e) {
      bitmaps = fs.readFileSync(process.cwd() + '/images/user-image.jpeg');
    }
    return response.send(bitmaps.toString('base64'));
  }

  // Update or save the uploaded image by image id.
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('post-user-image')
  async postUserIMage(
    @Req() request: RequestWithUser,
    @Res() response,
    @Body() userId: UserId,
  ) {
    const id: string = await this.userService.getImageId(userId?.id);
    let bitmaps;
    try {
      bitmaps = fs.readFileSync(process.cwd() + '/' + id);
    } catch (e) {
      bitmaps = fs.readFileSync(process.cwd() + '/images/user-image.jpeg');
    }
    return response.send(bitmaps.toString('base64'));
  }

  // Get all users public information
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get('get-all-users')
  async getAllUsers(@Req() request: RequestWithUser, @Res() response) {
    return response.send(await this.userService.GetAllUsersFromDB());
  }

  // Get user public information
  @HttpCode(200)
  @Post('get-user-public-data')
  @UseGuards(JwtAuthGuard)
  async getUserPublicData(
    @Req() request: RequestWithUser,
    @Res() response,
    @Body() userId: UserId,
  ) {
    const data = await this.userService.GetAllUsersFromDB();
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == userId.id) return response.send(data[i]);
    }
    return response.send({ error: 'User not found!' });
  }

  // Get the socket id by user
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get('get-wsid-by-userid/:id')
  async getWebSocketIdByUserId(@Param('id') id: string, @Res() response) {
    const user = await this.userService.findById(id);
    return response.send(user.idWebSocket);
  }

  // Create a new socket to the user
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get('new-ws/:socketId')
  async newWebSocket(
    @Param('socketId') socketId: string,
    @Req() request: RequestWithUser,
    @Res() response,
  ) {
    const user = await this.userService.findById(request.user.id);
    await this.userService.updateWebSocketId(user.id, socketId);
    return response.send(user.idWebSocket);
  }

  // Get the socket id from the request body and use this information to update
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('update-ws-id')
  async updateWebSocketId(
    @Req() request: RequestWithUser,
    @Res() response,
    @Body() body: socketId,
  ) {
    const user = await this.userService.findById(request.user.id);
    const socketId = body.id;
    await this.userService.updateWebSocketId(user.id, socketId);
    return response.send(true);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get('get-ws-id')
  async getWebSocketId(@Req() request: RequestWithUser) {
    const user = await this.userService.findById(request.user.id);
    return user.idWebSocket; // Return the socket id for the user
  }
}

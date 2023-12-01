import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/entitys/user.entity';
import { Repository } from 'typeorm';
import CreateUserDto from 'src/dtos/user-register.dto';
import { ChangeDisplayNameDto } from 'src/dtos/user-changedisplay.dto';
import { toDataURL } from 'qrcode';
import * as bcrypt from 'bcrypt';
import { response } from 'express';
import UserRegisterDto from 'src/dtos/user-register.dto';
import { ChatService } from './chat.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @Inject(forwardRef(() => ChatService))
    private chatService: ChatService,
  ) {}

  async findById(id: string) {
    const user: User = await this.userRepo.findOneBy({ id });
    if (user) {
      user.password = undefined;
      return user;
    }
    throw new HttpException(
      'UserId provided is invalid!',
      HttpStatus.NOT_FOUND,
    );
  }

  async findByUsername(userName: string) {
    const user = await this.userRepo.findOne({
      where: { userName: userName },
      relations: { channels: { history: true } },
    });
    if (user) return user;
    throw new HttpException(
      'Username provided is invalid!',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(userData: UserRegisterDto) {
    const newUser = await this.userRepo.create(userData);
    await this.userRepo.save(newUser);
    return newUser;
  }

  async updateDisplayName(id: string, registerData: ChangeDisplayNameDto) {
    try {
      const user = await this.findById(id);
      user.displayName = registerData.displayName;
      await this.userRepo.save(user);
    } catch (e) {
      throw new HttpException(
        'Error while update user displayName!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateImage(id: string, path: string) {
    try {
      const user = await this.findById(id);
      user.avatar = path;
      await this.userRepo.save(user);
      return user;
    } catch (e) {
      throw new HttpException(
        'Error while update user image!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return undefined;
  }

  async getImageId(id: string) {
    try {
      const user = await this.findById(id);
      return user.avatar;
    } catch (e) {
      throw new HttpException(
        'Error while get user image!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return undefined;
  }

  async GetAllUsersFromDB() {
    // const user = await this.userRepo.query(
    //   `SELECT userName, displayName, id, elo, xp FROM public."user"`,
    // );
    // const users = await this.userRepo.query(
    //   `SELECT userName, displayName, email, avatar, elo, friends, blocked FROM public."user"`,
    // );
    const users = await this.userRepo.find({ relations: { channels: true } });
    if (users) return users;
    throw new HttpException('Users not found!', HttpStatus.NOT_FOUND);
  }

  async FindUserOnDB(hash: string): Promise<string> {
    const user = await this.userRepo.query(`SELECT id FROM public."user"`);
    if (!user) return undefined;
    for (let i = 0; user[i]; i++) {
      if (await bcrypt.compare(user[i].id, hash)) return user[i].id;
    }
    throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
  }

  async getUserPublicData(userID: string) {
    const user = await this.userRepo.query(
      `SELECT displayName, id, elo FROM public."user" WHERE id = userID`,
    );
    if (user) return user;
    throw new HttpException(
      'Error in get user public information!',
      HttpStatus.NOT_FOUND,
    );
  }

  async setTwoFactorAuthenticationSecret(secret: string, userId: string) {
    try {
      const user = await this.findById(userId);
      (await user).secret2F = secret;
      await this.userRepo.save(user);
      return user;
    } catch (e) {
      throw new HttpException(
        'Error in 2fa authentication!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return undefined;
  }
  async turnOnTwoFactorAuthentication(userId: string) {
    try {
      const user = await this.findById(userId);
      (await user).is2FOn = true;
      await this.userRepo.save(user);
      return user;
    } catch (e) {
      throw new HttpException(
        'Error in 2fa authentication!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return undefined;
  }

  async turnOffTwoFactorAuthentication(userId: string) {
    try {
      const user = await this.findById(userId);
      (await user).is2FOn = false;
      await this.userRepo.save(user);
      return user;
    } catch (e) {
      throw new HttpException(
        'Error in 2fa authentication',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return undefined;
  }
  async generateQrCodeDataURL(otpAuthUrl: string) {
    return toDataURL(otpAuthUrl);
  }

  async updateWebSocketId(userId: string, socketId: string) {
    const user = await this.findById(userId);
    if (!user) {
      throw new HttpException(
        'Error during socket update request!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    user.idWebSocket = socketId;
    await this.userRepo.save(user);
  }

  async findByDisplayname(displayName: string): Promise<string> {
    try {
      const users = await this.userRepo.query(
        `SELECT displayName, id FROM public."user"`,
      );
      if (!users)
        throw new HttpException(
          'User not found QRY!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      for (let i = 0; users[i]; i++) {
        if (users[i].displayName == displayName) return users[i].id;
      }
      throw new HttpException(
        'User not found!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } catch (e) {
      throw new HttpException(
        'User not found!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return '';
  }

  async addChannelToUser(userName: string, channelDisplayName: string) {
    const user = await this.findByUsername(userName);
    if (!user) {
      throw new HttpException(
        'User not found!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const channel =
      await this.chatService.findByDisplayName(channelDisplayName);
    if (!channel) {
      throw new HttpException(
        'Channel not found!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (!Array.isArray(user.channels)) {
      user.channels = [];
    }
    user.channels.push(channel);
    return await this.userRepo.save(user);
  }

  async addUserToFriendsList(currentUser: string, friendUserName: string) {
    const user = await this.findByUsername(currentUser);
    const friend = await this.findByUsername(friendUserName);
    if (!user || !friend) {
      throw new HttpException('user or friend not found', HttpStatus.NOT_FOUND);
    }
    console.log(
      `debuf: adding ${friendUserName} to ${currentUser} friend's list`,
    );
    user.friends.push(friendUserName);
    this.userRepo.save(user);
    console.log(
      `debuf: adding ${currentUser} to ${friendUserName} friend's list`,
    );
    friend.friends.push(currentUser);
    this.userRepo.save(friend);
  }

  async removeUserToFriendsList(currentUser: string, friendUserName: string) {
    const user = await this.findByUsername(currentUser);
    const friend = await this.findByUsername(friendUserName);
    if (!user || !friend) {
      throw new HttpException('user or friend not found', HttpStatus.NOT_FOUND);
    }
    let index = user.friends.indexOf(friendUserName, 0);
    if (index > -1) {
      user.friends.splice(index, 1);
    }
    this.userRepo.save(user);
    index = friend.friends.indexOf(currentUser, 0);
    if (index > -1) {
      friend.friends.splice(index, 1);
    }
    this.userRepo.save(friend);
  }
}

import User from 'src/entitys/user.entity';
import { Repository } from 'typeorm';
import { ChangeDisplayNameDto } from 'src/dtos/user-changedisplay.dto';
import UserRegisterDto from 'src/dtos/user-register.dto';
import { ChatService } from './chat.service';
export declare class UserService {
    private userRepo;
    private chatService;
    constructor(userRepo: Repository<User>, chatService: ChatService);
    findById(id: string): Promise<User>;
    findByUsername(userName: string): Promise<User>;
    create(userData: UserRegisterDto): Promise<User>;
    updateDisplayName(id: string, registerData: ChangeDisplayNameDto): Promise<void>;
    updateImage(id: string, path: string): Promise<User>;
    getImageId(id: string): Promise<string>;
    GetAllUsersFromDB(): Promise<User[]>;
    FindUserOnDB(hash: string): Promise<string>;
    getUserPublicData(userID: string): Promise<any>;
    setTwoFactorAuthenticationSecret(secret: string, userId: string): Promise<User>;
    turnOnTwoFactorAuthentication(userId: string): Promise<User>;
    turnOffTwoFactorAuthentication(userId: string): Promise<User>;
    generateQrCodeDataURL(otpAuthUrl: string): Promise<string>;
    updateWebSocketId(userId: string, socketId: string): Promise<void>;
    findByDisplayname(displayName: string): Promise<string>;
    addChannelToUser(userName: string, channelDisplayName: string): Promise<User>;
    addUserToFriendsList(currentUser: string, friendUserName: string): Promise<void>;
    removeUserToFriendsList(currentUser: string, friendUserName: string): Promise<void>;
}

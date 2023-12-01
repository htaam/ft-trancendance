import { UserService } from '../services/user.service';
import { ChangeDisplayName, UserId } from 'src/dtos/user-changedisplay.dto';
import RequestWithUser from 'src/interfaces/request-with-user.i';
import { Response } from 'express';
import { socketId } from 'src/dtos/user-changedisplay.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getuserinformation(request: RequestWithUser, response: Response): Promise<Response<any, Record<string, any>>>;
    changeDisplayName(request: RequestWithUser, newData: ChangeDisplayName): Promise<{}>;
    uploadFile(request: RequestWithUser, file: any): Promise<import("../entitys/user.entity").default>;
    getUserImage(request: RequestWithUser, response: any): Promise<any>;
    postUserIMage(request: RequestWithUser, response: any, userId: UserId): Promise<any>;
    getAllUsers(request: RequestWithUser, response: any): Promise<any>;
    getUserPublicData(request: RequestWithUser, response: any, userId: UserId): Promise<any>;
    getWebSocketIdByUserId(id: string, response: any): Promise<any>;
    newWebSocket(socketId: string, request: RequestWithUser, response: any): Promise<any>;
    updateWebSocketId(request: RequestWithUser, response: any, body: socketId): Promise<any>;
    getWebSocketId(request: RequestWithUser): Promise<string>;
}

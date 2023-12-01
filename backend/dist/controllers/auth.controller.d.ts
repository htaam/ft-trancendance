import { AuthService } from '../services/auth.service';
import RequestWithUser from '../interfaces/request-with-user.i';
import { Response } from 'express';
import UserRegisterDto from 'src/dtos/user-register.dto';
import { Auth42Service } from '../auth/42auth/42auth.service';
import { UserService } from 'src/services/user.service';
import { Request } from 'express';
export declare class AuthController {
    private authService;
    private auth42Service;
    private userService;
    constructor(authService: AuthService, auth42Service: Auth42Service, userService: UserService);
    register(registrationData: UserRegisterDto): Promise<import("../entitys/user.entity").default>;
    login(request: RequestWithUser, response: Response): Promise<Response<any, Record<string, any>>>;
    logOut(_request: RequestWithUser, response: Response): Promise<void>;
    logcheck(request: RequestWithUser, response: Response): Promise<Response<any, Record<string, any>>>;
    handleToken(request: Request, response: Response): Promise<void>;
    turnOnTwoFactorAuthentication(request: any, body: any): Promise<void>;
    authenticate(request: any, body: any): Promise<{
        email: string;
        access_token: string;
    }>;
    generateQrcode(request: any, response: any): Promise<any>;
    handle2faToken(request: Request, response: Response, body: any): Promise<Response<any, Record<string, any>>>;
    user2fa(request: Request, response: Response, body: any): Promise<Response<any, Record<string, any>>>;
    disable2fa(request: any, response: any): Promise<any>;
}

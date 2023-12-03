import { AuthService } from '../services/auth.service';
import User from 'src/entitys/user.entity';
declare const LocalStrategy_base: any;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(userName: string, password: string, twoFactor: string): Promise<User>;
}
export {};

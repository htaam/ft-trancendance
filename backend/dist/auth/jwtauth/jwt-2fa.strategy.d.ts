import { Strategy } from 'passport-jwt';
import { UserService } from 'src/services/user.service';
declare const Jwt2faStrategy_base: new (...args: any[]) => Strategy;
export declare class Jwt2faStrategy extends Jwt2faStrategy_base {
    private readonly userService;
    constructor(userService: UserService);
    validate(payload: any): Promise<import("../../entitys/user.entity").default>;
}
export {};

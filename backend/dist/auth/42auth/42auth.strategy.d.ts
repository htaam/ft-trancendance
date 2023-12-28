import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
declare const FortyTwoStrategy_base: new (...args: any[]) => Strategy;
export declare class FortyTwoStrategy extends FortyTwoStrategy_base {
    private configService;
    constructor(configService: ConfigService);
}
export {};

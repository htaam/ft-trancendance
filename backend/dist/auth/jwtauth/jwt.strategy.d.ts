import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
import TokenPayload from "../../interfaces/token-payload.i";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: TokenPayload): Promise<import("../../entitys/user.entity").default>;
}
export default JwtStrategy;

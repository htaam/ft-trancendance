import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Request } from "express";
import TokenPayload from "../../interfaces/token-payload.i";

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
	constructor (private configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					return request?.cookies?.Authentication;
				},
			]),
			secretOrKey: configService.get("JWT_SECRET"),
			noreExpiration: false,
			});
		};

	async validate(payload: TokenPayload) {
		return payload.user;
	}
}

export default JwtStrategy;
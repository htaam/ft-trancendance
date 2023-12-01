"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("./user.service");
const bcrypt = require("bcrypt");
const axios_1 = require("@nestjs/axios");
const uuid_1 = require("uuid");
const fs = require("fs");
const process = require("process");
const otplib_1 = require("otplib");
let AuthService = class AuthService {
    constructor(usersService, jwtService, configService, httpService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.httpService = httpService;
    }
    async register(registerData) {
        try {
            const encryptedPassword = await bcrypt.hash(registerData.password, 12);
            const user = await this.usersService.create({
                userName: registerData.userName,
                displayName: registerData.userName,
                email: registerData.email,
                password: encryptedPassword,
                passwordRepeat: '',
                is2FOn: false,
                secret2F: 'undefine',
                avatar: 'notset',
                elo: 800,
                chat: [],
                blocked: [],
                friends: [],
                msgHist: '',
                idWebSocket: '',
                gameNumber: 0,
                gameWin: 0,
                gameLose: 0,
                winLoseRate: '',
                totalPointGet: 0,
                totalPointTake: 0,
                pointGetTakeRate: '',
                winStreak: 0,
                gameHist: '',
                xp: 0,
                totalGame: 0,
                socketID: '',
                slot: 0,
                isActive: false,
            });
            user.password = undefined;
            return user;
        }
        catch (e) {
            if (e?.code === 23505) {
                throw new common_1.HttpException('Username is already registered!', common_1.HttpStatus.BAD_REQUEST);
            }
            console.log(e);
            throw new common_1.HttpException('Error during registration request!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAutenticatedUser(userName, decryptedPassword) {
        try {
            const user = await this.usersService.findByUsername(userName);
            await this.verifyPassword(decryptedPassword, user.password);
            user.password = undefined;
            return user;
        }
        catch (e) { }
    }
    async verifyPassword(decryptedPassword, encryptedPassword) {
        const arePasswordMatching = await bcrypt.compare(decryptedPassword, encryptedPassword);
        if (!arePasswordMatching) {
            throw new common_1.HttpException('The credentials are not valid!', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    getJwtToken(user) {
        const payload = { user };
        return this.jwtService.sign(payload);
    }
    getCookieWithJwtToken(user) {
        const payload = { user };
        const token = this.jwtService.sign(payload);
        return `Authentication=${token}; SameSite=none; Domain: 51.254.37.204; HttpOnly; Path=/; Secure; Max-Age=3600`;
    }
    getCookieForLogout() {
        return 'Authentication=; HttpOnly; Path=/; Max-Age:0';
    }
    async redirectUserAuth(response, hash) {
        const hash64 = Buffer.from(hash, 'binary').toString('base64');
        response.redirect(301, process.env.SITE_URL + `:3000/auth/2fa/${hash64}`);
    }
    async downloadImage(url) {
        const imgLink = `/images/user-image/${(0, uuid_1.v4)()}.png`;
        const writer = fs.createWriteStream(process.cwd() + imgLink);
        const response = await this.httpService.axiosRef({
            url: url,
            method: 'GET',
            responseType: 'stream',
        });
        response.data.pipe(writer);
        return imgLink;
    }
    async generateTwoFactorAuthenticationSecret(user) {
        const secret = otplib_1.authenticator.generateSecret();
        const otpauthUrl = otplib_1.authenticator.keyuri(user.email, 'ft_transcendence', secret);
        await this.usersService.setTwoFactorAuthenticationSecret(secret, user.id);
        return {
            secret,
            otpauthUrl,
        };
    }
    isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode, user) {
        return otplib_1.authenticator.verify({
            token: twoFactorAuthenticationCode,
            secret: user.secret2F,
        });
    }
    async loginWith2fa(userWithoutPsw) {
        const payload = {
            userName: userWithoutPsw.userName,
            isTwoFactorAuthenticationEnabled: !!userWithoutPsw.is2FOn,
            isTwoFactorAuthenticated: true,
        };
        return {
            email: payload.userName,
            access_token: this.jwtService.sign(payload),
        };
    }
};
exports.AuthService = AuthService;
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "redirectUserAuth", null);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        config_1.ConfigService,
        axios_1.HttpService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
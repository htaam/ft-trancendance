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
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const common_1 = require("@nestjs/common");
const local_auth_guard_1 = require("../auth/local-auth.guard");
const jwt_auth_guard_1 = require("../auth/jwtauth/jwt-auth.guard");
const user_register_dto_1 = require("../dtos/user-register.dto");
const _42auth_service_1 = require("../auth/42auth/42auth.service");
const user_service_1 = require("../services/user.service");
const bcrypt = require("bcrypt");
const _42auth_guard_1 = require("../auth/42auth/42auth.guard");
let AuthController = class AuthController {
    constructor(authService, auth42Service, userService) {
        this.authService = authService;
        this.auth42Service = auth42Service;
        this.userService = userService;
    }
    async callback(code, res) {
        try {
            const domain = "api.intra.42.fr/oauth";
            const grant_type = "authorization_code";
            const client_id = "u-s4t2ud-5c1567ba9e786c33b15f2eb8f6919213808601f5859cf72aa525de7cae7f4597";
            const client_secret = "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";
            const redirect_uri = "http://localhost:5173/auth/callback";
            const tokenResponse = await fetch(`https://${domain}/token?` +
                `grant_type=${grant_type}&` +
                `client_id=${client_id}&` +
                `client_secret=${client_secret}&` +
                `code=${code}&` +
                `redirect_uri=${redirect_uri}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: "manual"
            });
            if (tokenResponse.ok) {
                const tokenResult = await tokenResponse.json();
                console.log("BACK Token Result:", tokenResult);
                res.status(common_1.HttpStatus.OK).json(tokenResult);
            }
            else {
                console.error('BACK Failed to get token:', tokenResponse.status, tokenResponse.statusText);
                throw new common_1.HttpException(tokenResponse.statusText, tokenResponse.status);
            }
        }
        catch (error) {
            console.error('BACK Error during token request:', error);
            throw new common_1.HttpException('Internal Server Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    fortyTwoAuth(req, session, res) {
        return this.authService.fortyTwoAuth(req, session, res);
    }
    async register(registrationData) {
        return this.authService.register(registrationData);
    }
    async login(request, response) {
        const { user } = request;
        const hash = await bcrypt.hash(user.id, 10);
        const rep = {
            ...user,
            hash: Buffer.from(hash, 'binary').toString('base64'),
        };
        return response.send(rep);
    }
    async logOut(_request, response) {
        response.setHeader('Set-Cookie', this.authService.getCookieForLogout());
        response.send();
    }
    async logcheck(request, response) {
        return response.send(request.user);
    }
    async turnOnTwoFactorAuthentication(request, body) {
        const userUp = await this.userService.findById(request.user.id);
        const isCodeValid = this.authService.isTwoFactorAuthenticationCodeValid(body.twoFactorAuthenticationCode, userUp);
        if (!isCodeValid) {
            throw new common_1.HttpException('Wrong authentication code', common_1.HttpStatus.UNAUTHORIZED);
        }
        await this.userService.turnOnTwoFactorAuthentication(request.user.id);
    }
    async authenticate(request, body) {
        const userUp = await this.userService.findById(request.user.id);
        const isCodeValid = this.authService.isTwoFactorAuthenticationCodeValid(body.twoFactorAuthenticationCode, userUp);
        if (!isCodeValid) {
            throw new common_1.HttpException('Wrong authentication code', common_1.HttpStatus.UNAUTHORIZED);
        }
        return this.authService.loginWith2fa(request.user);
    }
    async generateQrcode(request, response) {
        const url = await this.authService.generateTwoFactorAuthenticationSecret(request.user);
        const qrcode = await this.userService.generateQrCodeDataURL(url.otpauthUrl);
        return response.send(qrcode);
    }
    async handle2faToken(request, response, body) {
        if (!body.uniqueIdentifier)
            throw new common_1.HttpException('No hashed param', common_1.HttpStatus.UNAUTHORIZED);
        const code = Buffer.from(body.uniqueIdentifier[1], 'base64').toString('binary');
        const userid = await this.userService.FindUserOnDB(code);
        const user = await this.userService.findById(userid);
        const isCodeValid = this.authService.isTwoFactorAuthenticationCodeValid(body.twoFactorAuthenticationCode, user);
        if (!isCodeValid)
            throw new common_1.HttpException('Wrong authentication code', common_1.HttpStatus.UNAUTHORIZED);
        const cookie = await this.authService.getCookieWithJwtToken(user);
        response.setHeader('Set-Cookie', cookie);
        response.cookie('Authentication', this.authService.getJwtToken(user), {
            httpOnly: true,
            domain: process.env.SITE_NAME,
        });
        return response.send(true);
    }
    async user2fa(request, response, body) {
        if (!body.hash)
            throw new common_1.HttpException('No hashed param', common_1.HttpStatus.UNAUTHORIZED);
        const code = Buffer.from(body.hash, 'base64').toString('binary');
        const userid = await this.userService.FindUserOnDB(code);
        const user = await this.userService.findById(userid);
        if (user.is2FOn)
            return response.send(true);
        const cookie = this.authService.getCookieWithJwtToken(user);
        response.setHeader('Set-Cookie', cookie);
        response.cookie('Authentication', this.authService.getJwtToken(user), {
            httpOnly: true,
            domain: process.env.SITE_NAME,
        });
        return response.send(false);
    }
    async disable2fa(request, response) {
        const user = await this.userService.findById(request.user.id);
        if (!(await this.userService.turnOffTwoFactorAuthentication(user.id)))
            return response.send(false);
        return response.send(true);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('callback'),
    __param(0, (0, common_1.Query)('code')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "callback", null);
__decorate([
    (0, common_1.Get)('42'),
    (0, common_1.UseGuards)(_42auth_guard_1.FortyTwoAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Session)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "fortyTwoAuth", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_register_dto_1.default]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('login'),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.default),
    (0, common_1.Get)('logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logOut", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.default),
    (0, common_1.Get)('logcheck'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logcheck", null);
__decorate([
    (0, common_1.Post)('2fa/turn-on'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.default),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "turnOnTwoFactorAuthentication", null);
__decorate([
    (0, common_1.Post)('2fa/authenticate'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.default),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "authenticate", null);
__decorate([
    (0, common_1.Get)('2fa/generate'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.default),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "generateQrcode", null);
__decorate([
    (0, common_1.Post)('2fa/login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "handle2faToken", null);
__decorate([
    (0, common_1.Post)('2fa/check-on'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "user2fa", null);
__decorate([
    (0, common_1.Get)('2fa/disable'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.default),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "disable2fa", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        _42auth_service_1.Auth42Service,
        user_service_1.UserService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map
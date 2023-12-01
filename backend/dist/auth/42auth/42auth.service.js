"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth42Service = void 0;
const common_1 = require("@nestjs/common");
let Auth42Service = class Auth42Service {
    async accessToken(req) {
        try {
            const response = await fetch('https://api.intra.42.fr/oauth/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `grant_type=authorization_code&client_id=${process.env.UID_42AUTH}&client_secret=${process.env.SECRET_42AUTH}&code=${req}&redirect_uri=${process.env.URI_42AUTH}`,
            });
            const data = await response.json();
            if (!data)
                throw new common_1.HttpException('Empty user token', common_1.HttpStatus.BAD_REQUEST);
            return data;
        }
        catch (error) {
            throw new common_1.HttpException('Get user token error', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getUserInformation(token) {
        try {
            const response = await fetch('https://api.intra.42.fr/v2/me', {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                return await response.json();
            }
        }
        catch (error) {
            console.log('Error on fetch');
        }
        return null;
    }
};
exports.Auth42Service = Auth42Service;
exports.Auth42Service = Auth42Service = __decorate([
    (0, common_1.Injectable)()
], Auth42Service);
//# sourceMappingURL=42auth.service.js.map
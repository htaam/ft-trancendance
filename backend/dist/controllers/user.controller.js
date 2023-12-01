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
exports.UserController = void 0;
const jwt_auth_guard_1 = require("../auth/jwtauth/jwt-auth.guard");
const user_service_1 = require("../services/user.service");
const common_1 = require("@nestjs/common");
const user_changedisplay_dto_1 = require("../dtos/user-changedisplay.dto");
const class_validator_1 = require("class-validator");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const path = require("path");
const process = require("process");
const fs = require("fs");
const user_changedisplay_dto_2 = require("../dtos/user-changedisplay.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getuserinformation(request, response) {
        const userData = await this.userService.findById(request.user.id);
        return response.send(userData);
    }
    async changeDisplayName(request, newData) {
        let ret = {};
        const data = new user_changedisplay_dto_1.ChangeDisplayNameDto();
        data.displayName = newData.displayName;
        await (0, class_validator_1.validate)(data).then((errors) => {
            if (errors.length > 0) {
                console.log(errors);
                ret = errors;
                return ret;
            }
            ret = data;
        });
        await this.userService.updateDisplayName(request?.user.id, newData);
        return ret;
    }
    async uploadFile(request, file) {
        if (!request.user || !file)
            return;
        const userProfile = await this.userService.findById(request.user.id);
        if (userProfile.avatar == 'notset')
            return;
        fs.unlink(process.cwd() + '/' + userProfile.avatar, (err) => {
            if (err) {
                console.log(err);
            }
        });
        return this.userService.updateImage(request.user.id, file.path);
    }
    async getUserImage(request, response) {
        if (!request.user)
            throw new common_1.HttpException('User image request failed!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        const id = await this.userService.getImageId(request.user.id);
        let bitmaps;
        try {
            bitmaps = fs.readFileSync(process.cwd() + '/' + id);
        }
        catch (e) {
            bitmaps = fs.readFileSync(process.cwd() + '/images/user-image.jpeg');
        }
        return response.send(bitmaps.toString('base64'));
    }
    async postUserIMage(request, response, userId) {
        const id = await this.userService.getImageId(userId?.id);
        let bitmaps;
        try {
            bitmaps = fs.readFileSync(process.cwd() + '/' + id);
        }
        catch (e) {
            bitmaps = fs.readFileSync(process.cwd() + '/images/user-image.jpeg');
        }
        return response.send(bitmaps.toString('base64'));
    }
    async getAllUsers(request, response) {
        return response.send(await this.userService.GetAllUsersFromDB());
    }
    async getUserPublicData(request, response, userId) {
        const data = await this.userService.GetAllUsersFromDB();
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == userId.id)
                return response.send(data[i]);
        }
        return response.send({ error: 'User not found!' });
    }
    async getWebSocketIdByUserId(id, response) {
        const user = await this.userService.findById(id);
        return response.send(user.idWebSocket);
    }
    async newWebSocket(socketId, request, response) {
        const user = await this.userService.findById(request.user.id);
        await this.userService.updateWebSocketId(user.id, socketId);
        return response.send(user.idWebSocket);
    }
    async updateWebSocketId(request, response, body) {
        const user = await this.userService.findById(request.user.id);
        const socketId = body.id;
        await this.userService.updateWebSocketId(user.id, socketId);
        return response.send(true);
    }
    async getWebSocketId(request) {
        const user = await this.userService.findById(request.user.id);
        return user.idWebSocket;
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.default),
    (0, common_1.Get)('get-user-information'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getuserinformation", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.default),
    (0, common_1.Post)('display-name'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_changedisplay_dto_1.ChangeDisplayName]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeDisplayName", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.default),
    (0, common_1.Post)('upload-image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './images/userimage',
            filename(req, file, callback) {
                const filename = (0, uuid_1.v4)();
                const extension = path.parse(file.originalname).ext;
                callback(null, `${filename}${extension}`);
            },
        }),
    })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.default),
    (0, common_1.Get)('get-user-image'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserImage", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.default),
    (0, common_1.Post)('post-user-image'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, user_changedisplay_dto_1.UserId]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "postUserIMage", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.default),
    (0, common_1.Get)('get-all-users'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('get-user-public-data'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.default),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, user_changedisplay_dto_1.UserId]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserPublicData", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.default),
    (0, common_1.Get)('get-wsid-by-userid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getWebSocketIdByUserId", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.default),
    (0, common_1.Get)('new-ws/:socketId'),
    __param(0, (0, common_1.Param)('socketId')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "newWebSocket", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.default),
    (0, common_1.Post)('update-ws-id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, user_changedisplay_dto_2.socketId]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateWebSocketId", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.default),
    (0, common_1.Get)('get-ws-id'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getWebSocketId", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map
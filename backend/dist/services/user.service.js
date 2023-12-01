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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entitys/user.entity");
const typeorm_2 = require("typeorm");
const qrcode_1 = require("qrcode");
const bcrypt = require("bcrypt");
const chat_service_1 = require("./chat.service");
let UserService = class UserService {
    constructor(userRepo, chatService) {
        this.userRepo = userRepo;
        this.chatService = chatService;
    }
    async findById(id) {
        const user = await this.userRepo.findOneBy({ id });
        if (user) {
            user.password = undefined;
            return user;
        }
        throw new common_1.HttpException('UserId provided is invalid!', common_1.HttpStatus.NOT_FOUND);
    }
    async findByUsername(userName) {
        const user = await this.userRepo.findOne({
            where: { userName: userName },
            relations: { channels: { history: true } },
        });
        if (user)
            return user;
        throw new common_1.HttpException('Username provided is invalid!', common_1.HttpStatus.NOT_FOUND);
    }
    async create(userData) {
        const newUser = await this.userRepo.create(userData);
        await this.userRepo.save(newUser);
        return newUser;
    }
    async updateDisplayName(id, registerData) {
        try {
            const user = await this.findById(id);
            user.displayName = registerData.displayName;
            await this.userRepo.save(user);
        }
        catch (e) {
            throw new common_1.HttpException('Error while update user displayName!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateImage(id, path) {
        try {
            const user = await this.findById(id);
            user.avatar = path;
            await this.userRepo.save(user);
            return user;
        }
        catch (e) {
            throw new common_1.HttpException('Error while update user image!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return undefined;
    }
    async getImageId(id) {
        try {
            const user = await this.findById(id);
            return user.avatar;
        }
        catch (e) {
            throw new common_1.HttpException('Error while get user image!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return undefined;
    }
    async GetAllUsersFromDB() {
        const users = await this.userRepo.find({ relations: { channels: true } });
        if (users)
            return users;
        throw new common_1.HttpException('Users not found!', common_1.HttpStatus.NOT_FOUND);
    }
    async FindUserOnDB(hash) {
        const user = await this.userRepo.query(`SELECT id FROM public."user"`);
        if (!user)
            return undefined;
        for (let i = 0; user[i]; i++) {
            if (await bcrypt.compare(user[i].id, hash))
                return user[i].id;
        }
        throw new common_1.HttpException('User not found!', common_1.HttpStatus.NOT_FOUND);
    }
    async getUserPublicData(userID) {
        const user = await this.userRepo.query(`SELECT displayName, id, elo FROM public."user" WHERE id = userID`);
        if (user)
            return user;
        throw new common_1.HttpException('Error in get user public information!', common_1.HttpStatus.NOT_FOUND);
    }
    async setTwoFactorAuthenticationSecret(secret, userId) {
        try {
            const user = await this.findById(userId);
            (await user).secret2F = secret;
            await this.userRepo.save(user);
            return user;
        }
        catch (e) {
            throw new common_1.HttpException('Error in 2fa authentication!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return undefined;
    }
    async turnOnTwoFactorAuthentication(userId) {
        try {
            const user = await this.findById(userId);
            (await user).is2FOn = true;
            await this.userRepo.save(user);
            return user;
        }
        catch (e) {
            throw new common_1.HttpException('Error in 2fa authentication!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return undefined;
    }
    async turnOffTwoFactorAuthentication(userId) {
        try {
            const user = await this.findById(userId);
            (await user).is2FOn = false;
            await this.userRepo.save(user);
            return user;
        }
        catch (e) {
            throw new common_1.HttpException('Error in 2fa authentication', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return undefined;
    }
    async generateQrCodeDataURL(otpAuthUrl) {
        return (0, qrcode_1.toDataURL)(otpAuthUrl);
    }
    async updateWebSocketId(userId, socketId) {
        const user = await this.findById(userId);
        if (!user) {
            throw new common_1.HttpException('Error during socket update request!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        user.idWebSocket = socketId;
        await this.userRepo.save(user);
    }
    async findByDisplayname(displayName) {
        try {
            const users = await this.userRepo.query(`SELECT displayName, id FROM public."user"`);
            if (!users)
                throw new common_1.HttpException('User not found QRY!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            for (let i = 0; users[i]; i++) {
                if (users[i].displayName == displayName)
                    return users[i].id;
            }
            throw new common_1.HttpException('User not found!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        catch (e) {
            throw new common_1.HttpException('User not found!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return '';
    }
    async addChannelToUser(userName, channelDisplayName) {
        const user = await this.findByUsername(userName);
        if (!user) {
            throw new common_1.HttpException('User not found!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const channel = await this.chatService.findByDisplayName(channelDisplayName);
        if (!channel) {
            throw new common_1.HttpException('Channel not found!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (!Array.isArray(user.channels)) {
            user.channels = [];
        }
        user.channels.push(channel);
        return await this.userRepo.save(user);
    }
    async addUserToFriendsList(currentUser, friendUserName) {
        const user = await this.findByUsername(currentUser);
        const friend = await this.findByUsername(friendUserName);
        if (!user || !friend) {
            throw new common_1.HttpException('user or friend not found', common_1.HttpStatus.NOT_FOUND);
        }
        console.log(`debuf: adding ${friendUserName} to ${currentUser} friend's list`);
        user.friends.push(friendUserName);
        this.userRepo.save(user);
        console.log(`debuf: adding ${currentUser} to ${friendUserName} friend's list`);
        friend.friends.push(currentUser);
        this.userRepo.save(friend);
    }
    async removeUserToFriendsList(currentUser, friendUserName) {
        const user = await this.findByUsername(currentUser);
        const friend = await this.findByUsername(friendUserName);
        if (!user || !friend) {
            throw new common_1.HttpException('user or friend not found', common_1.HttpStatus.NOT_FOUND);
        }
        let index = user.friends.indexOf(friendUserName, 0);
        if (index > -1) {
            user.friends.splice(index, 1);
        }
        this.userRepo.save(user);
        index = friend.friends.indexOf(currentUser, 0);
        if (index > -1) {
            friend.friends.splice(index, 1);
        }
        this.userRepo.save(friend);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.default)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => chat_service_1.ChatService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        chat_service_1.ChatService])
], UserService);
//# sourceMappingURL=user.service.js.map
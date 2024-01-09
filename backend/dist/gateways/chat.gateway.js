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
exports.ChatGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const chat_service_1 = require("../services/chat.service");
const user_service_1 = require("../services/user.service");
let backendMembers = [''];
let ChatGateway = class ChatGateway {
    constructor(userService, chatService) {
        this.userService = userService;
        this.chatService = chatService;
        this.logger = new common_1.Logger('Gateway Log');
    }
    async sendMessage(data) {
        console.log('webScoket: frontend asked to send message');
        if (data.content == '') {
            throw new common_1.HttpException('sendMessage: empty message', common_1.HttpStatus.FORBIDDEN);
        }
        const channel = await this.chatService.findByDisplayName(data.channel);
        if (!channel) {
            throw new common_1.HttpException('sendMessage: channel not found', common_1.HttpStatus.NOT_FOUND);
        }
        const user = await this.userService.findByUsername(data.userName);
        if (!user) {
            throw new common_1.HttpException('sendMessage: user not found', common_1.HttpStatus.NOT_FOUND);
        }
        let userIsMembers = 0;
        for (let i = 0; i < channel.members.length; i++) {
            if (channel.members[i].userName == user.userName)
                userIsMembers = 1;
        }
        if (userIsMembers == 0)
            return;
        const newMessage = await this.chatService.addMessageToChannel(data.channel, data.content, data.userName);
        return newMessage;
    }
    async getUserChannels(userName) {
        console.log(`webScoket: frontend asked for user channels. User: ${userName}`);
        const user = await this.userService.findByUsername(userName);
        if (user && user.channels)
            return user.channels;
    }
    async createChannel(data) {
        console.log(`webScoket: frontend asked to creat a channel: {\n\tData:\n\t\tcreator: ${data.creator}\n\t\tdisplayName: ${data.displayName}\n\t\tavatar: ${data.avatar}\n\t\tmembers: ${data.members}}`);
        if (data.creator.length < 1)
            return;
        const newChannel = await this.chatService.createChannel(data.displayName, data.avatar, data.members, data.creator, data.type);
        return newChannel;
    }
    async getUserFriends(userName) {
        console.log(`webScoket: frontend asked for user ${userName} friends`);
        const user = await this.userService.findByUsername(userName);
        if (!user)
            return [];
        return user.friends;
    }
    async getAllUsers() {
        console.log(`webScoket: frontend asked for all users`);
        return await this.userService.GetAllUsersFromDB();
    }
    async addFriendToUser(data) {
        console.log(`webScoket: frontend asked to add friend to user friends list`);
        if (!data.friend || !data.friend)
            return [];
        const user = await this.userService.findByUsername(data.currentUser);
        if (!user)
            return [];
        for (let i = 0; i < user.friends.length; i++) {
            if (data.friend == user.friends[i])
                return user.friends;
        }
        this.userService.addUserToFriendsList(data.currentUser, data.friend);
        return user.friends;
    }
    async removeFriendToUser(data) {
        console.log(`webScoket: frontend asked to remove friend from user friends list`);
        if (!data.friend || !data.friend)
            return [];
        const user = await this.userService.findByUsername(data.currentUser);
        if (!user)
            return [];
        let exists = 0;
        for (let i = 0; i < user.friends.length; i++) {
            if (data.friend == user.friends[i])
                exists = 1;
        }
        if (!exists)
            return user.friends;
        this.userService.removeUserToFriendsList(data.currentUser, data.friend);
        return user.friends;
    }
    async addingMembers(data) {
        console.log(`frontend asked to add user to possible channel member; type: ${data.type}; member: ${data.member}`);
        if (data.type == 'add')
            backendMembers.push(data.member);
        else if (data.type == 'rmv') {
            const index = backendMembers.indexOf(data.member, 0);
            if (index > -1)
                backendMembers.splice(index, 1);
        }
        return backendMembers;
    }
    async getChannelMessages(data) {
        console.log(`frontend asked for channel ${data.channel} messages; user that asked: ${data.userName}`);
        const user = await this.userService.findByUsername(data.userName);
        if (!user)
            return [];
        const channel = await this.chatService.findByDisplayName(data.channel);
        if (!channel)
            return [];
        let userIsMember = false;
        channel.members.map((member) => {
            if (member.userName == data.userName)
                userIsMember = true;
        });
        if (userIsMember == false)
            return [];
        return channel.history;
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "sendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getUserChannels'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "getUserChannels", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('createChannel'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "createChannel", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getUserFriends'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "getUserFriends", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getAllUsers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "getAllUsers", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('addFriend'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "addFriendToUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('removeFriend'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "removeFriendToUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('addingMembers'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "addingMembers", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getChannelMessages'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "getChannelMessages", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: 'http://localhost:5173', credentials: true } }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        chat_service_1.ChatService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map
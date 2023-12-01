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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const channel_entity_1 = require("../entitys/channel.entity");
const typeorm_2 = require("typeorm");
const user_service_1 = require("./user.service");
const message_service_1 = require("./message.service");
let ChatService = class ChatService {
    constructor(chatRepo, userService, messageService) {
        this.chatRepo = chatRepo;
        this.userService = userService;
        this.messageService = messageService;
    }
    async findById(id) {
        const channel = await this.chatRepo.findOneBy({ id });
        if (channel) {
            return channel;
        }
        throw new common_1.HttpException('ChannelId provided is invalid!', common_1.HttpStatus.NOT_FOUND);
    }
    async findByDisplayName(displayName) {
        const channel = await this.chatRepo.findOne({
            where: { displayName: displayName },
            relations: { members: true, history: { sender: true, channel: true } },
        });
        if (channel)
            return channel;
        throw new common_1.HttpException('Display name provided is invalid!', common_1.HttpStatus.NOT_FOUND);
    }
    async createChannel(displayName, avatar, members, creator, type) {
        if (displayName.length < 1 && type != 'personal') {
            throw new common_1.HttpException('Public or private channel must have displayName', common_1.HttpStatus.FORBIDDEN);
        }
        const creatorUser = await this.userService.findByUsername(creator);
        if (!creatorUser) {
            throw new common_1.HttpException('Creator userName not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (members.length > 1 && type == 'personal') {
            throw new common_1.HttpException('type of channel not compatible with more than two mebers', common_1.HttpStatus.FORBIDDEN);
        }
        let index = members.indexOf('', 0);
        if (index > -1)
            members.splice(index, 1);
        members.push(creator);
        let userMembers = [];
        for (let i = 0; i < members.length; i++) {
            const memberUser = await this.userService.findByUsername(members[i]);
            if (!memberUser) {
                throw new common_1.HttpException('member userName not found', common_1.HttpStatus.NOT_FOUND);
            }
            userMembers.push(memberUser);
        }
        const uniqueMembers = Array.from(new Set(userMembers));
        const newChannel = this.chatRepo.create({
            displayName: displayName,
            type: type,
            avatar: avatar,
            members: [],
            creator: creator,
            admins: [creatorUser.userName],
            blocked: [],
            history: [],
        });
        const savedChannel = await this.chatRepo.save(newChannel);
        savedChannel.members = uniqueMembers;
        const updatedChannel = await this.chatRepo.save(savedChannel);
        for (let i = 0; i < uniqueMembers.length; i++) {
            this.userService.addChannelToUser(uniqueMembers[i].userName, updatedChannel.displayName);
        }
        return updatedChannel;
    }
    async GetAllChannelsFromDB() {
        const channels = await this.chatRepo.find({ relations: { members: true } });
        if (channels)
            return channels;
        else
            return [];
    }
    async addMessageToChannel(displayName, content, sender) {
        const channel = await this.findByDisplayName(displayName);
        const user = await this.userService.findByUsername(sender);
        if (!channel) {
            throw new common_1.HttpException('addMessageToChannel: channel not found', common_1.HttpStatus.NOT_FOUND);
        }
        else if (!user) {
            throw new common_1.HttpException('addMessageToChannel: user not found', common_1.HttpStatus.NOT_FOUND);
        }
        const message = await this.messageService.messageCreate(user, content, channel);
        if (!message) {
            throw new common_1.HttpException('addMessageToChannel: message wasnt created', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        channel.history.push(message);
        await this.chatRepo.save(channel);
        return message;
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(channel_entity_1.default)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => message_service_1.MessageService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService,
        message_service_1.MessageService])
], ChatService);
//# sourceMappingURL=chat.service.js.map
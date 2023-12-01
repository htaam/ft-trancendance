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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const message_entity_1 = require("./message.entity");
let Channel = class Channel {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Channel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { unique: true }),
    __metadata("design:type", String)
], Channel.prototype, "displayName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Channel.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Channel.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.default, (user) => user.channels),
    __metadata("design:type", Array)
], Channel.prototype, "members", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Channel.prototype, "creator", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, array: true }),
    __metadata("design:type", Array)
], Channel.prototype, "admins", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, array: true }),
    __metadata("design:type", Array)
], Channel.prototype, "blocked", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.default, (message) => message.channel),
    __metadata("design:type", Array)
], Channel.prototype, "history", void 0);
Channel = __decorate([
    (0, typeorm_1.Entity)()
], Channel);
exports.default = Channel;
//# sourceMappingURL=channel.entity.js.map
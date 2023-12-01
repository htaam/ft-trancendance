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
exports.socketId = exports.UserId = exports.ChangeDisplayName = exports.ChangeDisplayNameDto = void 0;
const class_validator_1 = require("class-validator");
class ChangeDisplayNameDto {
}
exports.ChangeDisplayNameDto = ChangeDisplayNameDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], ChangeDisplayNameDto.prototype, "displayName", void 0);
class ChangeDisplayName {
}
exports.ChangeDisplayName = ChangeDisplayName;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], ChangeDisplayName.prototype, "displayName", void 0);
class UserId {
}
exports.UserId = UserId;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserId.prototype, "id", void 0);
class socketId {
}
exports.socketId = socketId;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], socketId.prototype, "id", void 0);
//# sourceMappingURL=user-changedisplay.dto.js.map
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
exports.GameService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const game_entity_1 = require("../entitys/game.entity");
const typeorm_2 = require("typeorm");
(0, common_1.Injectable)();
let GameService = class GameService {
    constructor(gameRepo) {
        this.gameRepo = gameRepo;
    }
    async findById(id) {
        const game = await this.gameRepo.findOneBy({ id });
        if (game) {
            return game;
        }
        throw new common_1.HttpException('Game Id provided is invalid!', common_1.HttpStatus.NOT_FOUND);
    }
};
exports.GameService = GameService;
exports.GameService = GameService = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(game_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GameService);
//# sourceMappingURL=game.service.js.map
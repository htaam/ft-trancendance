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
exports.CatsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cats_entity_1 = require("./entities/cats.entity");
let CatsService = class CatsService {
    constructor(catRepository) {
        this.catRepository = catRepository;
    }
    findAll() {
        return this.catRepository.find();
    }
    async findOne(id) {
        const cat = await this.catRepository.findOne({ where: { id: Number(id) } });
        if (!cat) {
            throw new common_1.NotFoundException(`Cat #${id} not found`);
        }
        return cat;
    }
    create(createCatDto) {
        const cat = this.catRepository.create(createCatDto);
        return this.catRepository.save(cat);
    }
    async update(id, updateCatDto) {
        const cat = await this.catRepository.preload({
            id: +id,
            ...updateCatDto,
        });
        if (!cat) {
            throw new common_1.NotFoundException(`Cat #${id} not found`);
        }
        return this.catRepository.save(cat);
    }
    async remove(id) {
        const cat = await this.findOne(id);
        return this.catRepository.remove(cat);
    }
};
exports.CatsService = CatsService;
exports.CatsService = CatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cats_entity_1.Cat)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CatsService);
//# sourceMappingURL=cats.service.js.map
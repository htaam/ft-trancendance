"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatsService = void 0;
const common_1 = require("@nestjs/common");
let CatsService = class CatsService {
    constructor() {
        this.cats = [
            {
                id: 1,
                name: 'Shiva',
                eyes: 'blue',
                color: ['white', 'gray', 'brown', 'black'],
            },
            {
                id: 2,
                name: 'Mizuki',
                eyes: 'green',
                color: ['black', 'dark brown', 'white'],
            },
            {
                id: 3,
                name: 'Menina',
                eyes: 'brown',
                color: ['black', 'brown', 'orange'],
            },
        ];
    }
    findAll() {
        return this.cats;
    }
    findOne(id) {
        return this.cats.find(item => item.id === +id);
    }
    create(createCatsDto) {
        this.cats.push(createCatsDto);
    }
    update(id, updateCatsDto) {
        const existingCats = this.findOne(id);
        if (existingCats) {
        }
    }
    remove(id) {
        const catsIndex = this.cats.findIndex(item => item.id === +id);
        if (catsIndex >= 0) {
            this.cats.splice(catsIndex, 1);
        }
    }
};
exports.CatsService = CatsService;
exports.CatsService = CatsService = __decorate([
    (0, common_1.Injectable)()
], CatsService);
//# sourceMappingURL=cats.service.js.map
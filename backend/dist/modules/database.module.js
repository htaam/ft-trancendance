"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const channel_entity_1 = require("../entitys/channel.entity");
const message_entity_1 = require("../entitys/message.entity");
const user_entity_1 = require("../entitys/user.entity");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('POSTGRES_HOST'),
                    username: configService.get('POSTGRES_USER'),
                    port: configService.get('POSTGRES_PORT'),
                    password: configService.get('POSTGRES_PASSWORD'),
                    database: configService.get('POSTGRES_DATABASE'),
                    entities: [user_entity_1.default, channel_entity_1.default, message_entity_1.default],
                    synchronize: true,
                }),
            }),
        ],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map
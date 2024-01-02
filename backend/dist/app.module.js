"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cors = require("cors");
const user_module_1 = require("./modules/user.module");
const auth_module_1 = require("./modules/auth.module");
const database_module_1 = require("./modules/database.module");
const chat_module_1 = require("./modules/chat.module");
const message_module_1 = require("./modules/message.module");
const game_module_1 = require("./modules/game.module");
const talk_module_1 = require("./talk/talk.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(cors())
            .forRoutes({ path: '/auth/42', method: common_1.RequestMethod.ALL });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            config_1.ConfigModule.forRoot(),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            chat_module_1.ChatModule,
            message_module_1.MessageModule,
            game_module_1.GameModule,
            talk_module_1.TalkModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', '..', '..', '..', 'dist', 'client'),
            })
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
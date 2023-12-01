"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth42Module = void 0;
const common_1 = require("@nestjs/common");
const _42auth_service_1 = require("./42auth.service");
let Auth42Module = class Auth42Module {
};
exports.Auth42Module = Auth42Module;
exports.Auth42Module = Auth42Module = __decorate([
    (0, common_1.Module)({
        providers: [_42auth_service_1.Auth42Service],
        exports: [_42auth_service_1.Auth42Service],
    })
], Auth42Module);
//# sourceMappingURL=42auth.module.js.map
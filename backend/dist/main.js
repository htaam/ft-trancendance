"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express = require("express");
const path = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const corsOptions = {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    };
    app.enableCors(corsOptions);
    app.use('/images', express.static(path.join(__dirname, '..', 'images')));
    await app.listen(process.env.BACK_PORT);
    app.enableShutdownHooks();
}
bootstrap();
//# sourceMappingURL=main.js.map
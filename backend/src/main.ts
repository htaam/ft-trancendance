// main.ts

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.enableCors(corsOptions);

  // Serve static files from the 'images' directory
  app.use('/images', express.static(path.join(__dirname, '..', 'images')));

  await app.listen(process.env.BACK_PORT);

  app.enableShutdownHooks();   // Gracefully shutdown the server
}

bootstrap();

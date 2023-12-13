import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/*
    whitelist: true, -> Removes passed parameters not defined in DTOs
    forbidNonWhitelisted: true, -> Adds an error to the previous rule
    transform: true, -> Automatically try to convert variables to the expected type (string <-> number)
*/

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));
  await app.listen(process.env.BACK_PORT);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app';
import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';

const validationConfig: ValidationPipeOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(validationConfig));
  await app.listen(3000);
}
bootstrap();

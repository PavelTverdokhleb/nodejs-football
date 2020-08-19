import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app';
import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';

/**
 * Config for ValidationPipe.
 */
const validationConfig: ValidationPipeOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
};

/**
 * Initialize application.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(validationConfig));
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
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

  const options = new DocumentBuilder()
    .setTitle('Node.js football API')
    .setDescription('The football API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

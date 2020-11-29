import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';
import {
  INestApplication,
  NestApplicationOptions,
  ValidationPipe,
} from '@nestjs/common';

// you can bootstrap multiple modules to have nested routes
async function bootstrap() {
  const app = await NestFactory.create(AppModule, getOptions());
  setGlobalPrefix(app);
  initSentry();
  initSwagger(app);
  initPipes(app);
  await app.listen(3000);
}

function getOptions() {
  const options: NestApplicationOptions = {
    logger: ['error', 'warn'],
  };
  return process.env.NODE_ENV === 'production' ? options : {};
}

function setGlobalPrefix(app: INestApplication) {
  app.setGlobalPrefix('v1');
}

function initSentry() {
  Sentry.init({
    dsn: process.env.SENTRY_DNS,
    environment: process.env.NODE_ENV,
    enabled: process.env.NODE_ENV === 'production',
    maxValueLength: 2048,
    release: null,
    serverName: 'Nest JS',
  });
}

function initSwagger(app: INestApplication) {
  if (process.env.NODE_ENV === 'development') {
    const options = new DocumentBuilder()
      .setTitle('Seng Kea API')
      .setDescription('API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }
}

function initPipes(app: INestApplication) {
  // for DTO and params auto validate
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: process.env.NODE_ENV === 'production',
      transform: true,
    }),
  );
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';

function initSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Seng Kea API')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}

function initPipes(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: process.env.NODE_ENV === 'production',
      transform: true,
    }),
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initSwagger(app);
  initPipes(app);
  await app.listen(3000);
}
bootstrap();


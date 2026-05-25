import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Construction Worklog API')
    .setDescription('API for construction work journal')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3003);

  console.log(
    `🚀 Server running on http://localhost:${process.env.PORT ?? 3003}`,
  );

  console.log(
    `📚 Swagger running on http://localhost:${process.env.PORT ?? 3003}/docs`,
  );
}

void bootstrap();

import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);

  const port = process.env.PORT || 3001;
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('Other')
    .setDescription('Article service work on posts')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app
    .listen(port, '0.0.0.0')
    .then(() => logger.log(`User service is running on port ${port}`))
    .catch((error) => logger.error(error));
}
bootstrap();

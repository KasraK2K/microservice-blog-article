import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);

  const port = process.env.PORT || 3001;
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app
    .listen(port, '0.0.0.0')
    .then(() => logger.log(`User service is running on port ${port}`))
    .catch((error) => logger.error(error));
}
bootstrap();

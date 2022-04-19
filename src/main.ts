import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './components/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalPipes(new ValidationPipe({
    forbidUnknownValues: true,
    skipMissingProperties: false,
    transform: true,
  }));
  app.enableVersioning();

  await app.listen(3000, '0.0.0.0');
}

bootstrap();

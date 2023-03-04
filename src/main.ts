import compression from '@fastify/compress';
import fastifyCsrf from '@fastify/csrf-protection';
import fastifyHelmet from '@fastify/helmet';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';

import { WinstonModule } from 'nest-winston';
import winston from 'winston';

import { AppModule } from './modules/app.module';
import { clusterize, log } from './utils';

const bootstrap = async(): Promise<void> => {

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(), {
      cors: true,
      bufferLogs: true,
      logger: WinstonModule.createLogger(log('error'))
    }
  );

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));

  await app.register(fastifyHelmet, {
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    crossOriginEmbedderPolicy: false
  });

  await app.register(fastifyCsrf);
  await app.register(compression, { encodings: ['gzip', 'deflate'] });
  app.listen(8080, '0.0.0.0');
  winston.createLogger(log()).info('Server is listening at port 8080');

};

process.env.CLUSTERING === 'true'
  ? clusterize(bootstrap)
  : bootstrap();
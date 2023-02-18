import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WinstonModule } from 'nest-winston';

import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { DummyModule } from './dummy/dummy.module';
import { Dummy } from './dummy/model';
import { SocketModule } from './socket/socket.module';
import { NotFoundExceptionFilter } from '@/filters/notfound-exception.filter';
import { log } from '@/utils/log';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        name: configService.get<string>('DATABASE_NAME'),
        type: 'sqlite',
        database: configService.get<string>('DATABASE_DB'),
        synchronize: true,
        logging: true,
        entities: [Dummy],
        logger: 'file'
      })
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    WinstonModule.forRoot(log()),
    AuthModule,
    DummyModule,
    SocketModule
  ],
  providers: [{
    provide: APP_FILTER,
    useClass: NotFoundExceptionFilter
  }]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
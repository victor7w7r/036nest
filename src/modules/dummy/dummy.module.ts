import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DummyController } from './controller/dummy.controller';
import { Dummy } from './model';
import { DummyService } from './service/dummy.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dummy])],
  controllers: [DummyController],
  providers: [DummyService]
})
export class DummyModule {}
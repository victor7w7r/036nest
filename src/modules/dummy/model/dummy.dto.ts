import { PartialType } from '@nestjs/mapped-types';

import { IsNotEmpty, IsString } from 'class-validator';
import { instanceToPlain, plainToClass } from 'class-transformer';

import { Dummy } from './';

export class CreateDummyDto {

  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;
}

export class UpdateDummyDto extends PartialType(CreateDummyDto) {}

export const toEntity = (dummyDto: CreateDummyDto | UpdateDummyDto): Dummy =>
  plainToClass(Dummy, instanceToPlain(dummyDto));
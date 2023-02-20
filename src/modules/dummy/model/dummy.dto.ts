import { PartialType } from '@nestjs/mapped-types';

import { IsNotEmpty, IsString } from "class-validator";
import { instanceToPlain, plainToClass } from "class-transformer";

import { Dummy } from './';

export class CreateDummyDto {

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  toModel = (): Dummy =>
    plainToClass(Dummy, instanceToPlain(this));

}

export class UpdateDummyDto extends PartialType(CreateDummyDto) {}
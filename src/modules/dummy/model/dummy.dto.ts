import { PartialType } from '@nestjs/mapped-types';

import { IsNotEmpty, IsString } from "class-validator";
import { instanceToPlain, plainToClass } from "class-transformer";

import { Dummy } from './';

export class CreateDummyDto {

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  toModel(): Dummy {
    const data = instanceToPlain(this);
    return plainToClass(Dummy, data);
  }

}

export class UpdateDummyDto extends PartialType(CreateDummyDto) {}
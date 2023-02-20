import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import {
  type UpdateDummyDto,
  type CreateDummyDto,
  toEntity,
  Dummy
} from '../model';

@Injectable()
export class DummyService {

  constructor(
    @InjectRepository(Dummy)
    private dummyRepository: Repository<Dummy>
  ) {}

  readonly findAll = async(): Promise<Dummy[]> =>
    await this.dummyRepository.find();

  private readonly findCheck = async(id: number) =>
    await this.dummyRepository.findOneBy({ id });

  async findOne(id: number): Promise<Dummy> {
    const check = await this.findCheck(id);
    if(!check) throw new NotFoundException(`This dummy is not found with id ${id}`);
    return check;
  }

  async create(createDummyDto: CreateDummyDto): Promise<void> {
    await this.dummyRepository.save(toEntity(createDummyDto));
  }

  async update(updateDummyDto: UpdateDummyDto, id: number): Promise<void> {
    if(!await this.findCheck(id))
      throw new NotFoundException(`This dummy is not found with id ${id}`);
    await this.dummyRepository.update(id, toEntity(updateDummyDto));
  }

  async delete(id: number): Promise<void> {
    if(!await this.findCheck(id))
      throw new NotFoundException(`This dummy is not found with id ${id}`);
    await this.dummyRepository.delete(id);
  }

}
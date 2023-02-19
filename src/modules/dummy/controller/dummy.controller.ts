import {
  Controller, Get, Post, Put, Delete, Param,
  HttpCode, UseFilters, Body, Inject, ParseIntPipe
} from '@nestjs/common';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import type { Logger } from 'winston';

import { type Dummy, CreateDummyDto, UpdateDummyDto } from '../model';
import { DummyService } from '../service/dummy.service';
import { HttpExceptionFilter } from '@/filters/http-exception.filter';

@Controller('dummy')
@UseFilters(new HttpExceptionFilter())
export class DummyController {

  constructor(
    private readonly dummyService: DummyService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get()
  @HttpCode(200)
  async getClients(): Promise<Dummy[]> {
    this.logger.info('GET /dummy');
    return await this.dummyService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async getClient(@Param('id', ParseIntPipe) id: number): Promise<Dummy> {
    this.logger.info(`GET /dummy/${id}`);
    return await this.dummyService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  async createClient(@Body() createDummyDto: CreateDummyDto): Promise<{ message: string }> {
    this.logger.info('POST /dummy');
    await this.dummyService.create(createDummyDto);
    return { message: "Dummy is saved successfully" };
  }

  @Put(':id')
  @HttpCode(200)
  async replaceClient(
    @Body() updateDummyDto: UpdateDummyDto,
    @Param('id', ParseIntPipe) id: number
    ): Promise<{ message: string }> {

    this.logger.info(`PUT /dummy/${id}`);
    await this.dummyService.update(updateDummyDto, id);
    return { message: "Dummy is replaced successfully" };
  }

  @Delete(':id')
  @HttpCode(200)
  async removeClient( @Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    this.logger.warn(`DELETE /dummy/${id}`);
    await this.dummyService.delete(id);
    return { message: "Dummy is deleted successfully" };
  }

}
import { Controller, Get, Query } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { query } from 'express';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get()
  async findl(@Query('query') query: string) {
    return await this.leadsService.find(query);
  }
}

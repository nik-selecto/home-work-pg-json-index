import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProjectConfigType } from '../../config/config.type';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configSerivice: ConfigService<ProjectConfigType>,
  ) {}

  @Get()
  getHello(): string {
    return this.configSerivice.get('PG_URL');
  }
}

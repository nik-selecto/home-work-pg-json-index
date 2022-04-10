import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProjectConfigType } from '../../general-modules/config/config.type';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService<ProjectConfigType>) {}

  getHello(): string {
    return `hello world! (MODE=${this.configService.get('MODE')})`;
  }
}

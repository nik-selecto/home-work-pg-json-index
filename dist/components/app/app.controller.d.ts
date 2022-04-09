import { ConfigService } from '@nestjs/config';
import { ProjectConfigType } from '../../config/config.type';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    private readonly configSerivice;
    constructor(appService: AppService, configSerivice: ConfigService<ProjectConfigType>);
    getHello(): string;
}

import { ConfigService } from '@nestjs/config';
import { ProjectConfigType } from '../../general-modules/config/config.type';
export declare class AppService {
    private configService;
    constructor(configService: ConfigService<ProjectConfigType>);
    getHello(): string;
}

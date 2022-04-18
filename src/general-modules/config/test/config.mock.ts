import { ConfigModule } from '@nestjs/config';
import { ConfigModeTypeEnum } from '../config.type';
import { validateConfig } from '../config.validation';

process.env.MODE = ConfigModeTypeEnum.TEST;

export const MockConfigModule = ConfigModule.forRoot({
  envFilePath: `.${process.env.MODE}.env`,
  isGlobal: true,
  validate: validateConfig,
  expandVariables: true,
  cache: true,
});

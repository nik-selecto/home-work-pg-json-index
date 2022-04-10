import { ConfigModule } from '@nestjs/config';
import { config } from 'dotenv';
import { validateConfig } from './config.validation';

config();

export const projectConfigModule = ConfigModule.forRoot({
  envFilePath: `.${process.env.MODE}.env`,
  validate: validateConfig,
  isGlobal: true,
  expandVariables: true,
  cache: true,
});

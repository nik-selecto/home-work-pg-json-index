import { ConfigModule } from '@nestjs/config';
import 'dotenv/config';
import { validateConfig } from './config.validation';

export const ProjectConfigModule = ConfigModule.forRoot({
  envFilePath: `.${process.env.MODE}.env`,
  validate: validateConfig,
  isGlobal: true,
  expandVariables: true,
  cache: true,
});

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectConfigType } from '../config/config.type';

export const PgModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory(configService: ConfigService<ProjectConfigType>) {
    return {
      type: 'postgres',
      port: configService.get('PG_PORT'),
      host: configService.get('PG_HOST'),
      database: configService.get('PG_DB'),
      username: configService.get('PG_USER'),
      password: configService.get('PG_PASS'),
    };
  },
});

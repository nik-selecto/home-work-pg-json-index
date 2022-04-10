import { Module } from '@nestjs/common';
import { projectConfigModule } from '../../general-modules/config/config.module';
import { pgModule } from '../../general-modules/pg/pg.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [projectConfigModule, pgModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

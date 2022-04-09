import { Module } from '@nestjs/common';
import { config } from 'dotenv';
import { projectConfigModule } from '../../config/config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

config();
@Module({
  imports: [projectConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

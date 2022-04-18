import { Module } from '@nestjs/common';
import { ProjectConfigModule } from '../../general-modules/config/config.module';
import { MongoModule } from '../../general-modules/mongo/mongo.module';
import { PgModule } from '../../general-modules/pg/pg.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ProjectConfigModule, PgModule, MongoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ProjectConfigModule } from '../../general-modules/config/config.module';
import { AllExceptionsFilter } from '../../general-modules/exceptions/all-exceptions.filter';
import { MongoModule } from '../../general-modules/mongo/mongo.module';
import { PgTypeormModule } from '../../general-modules/pg/pg-typeorm.module';
import { PgModule } from '../../general-modules/pg/pg.module';
import { AuthModule } from '../auth/auth.module';
import { TablesModule } from '../tables/tables.module';
import { UsersModule } from '../users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ProjectConfigModule, PgTypeormModule, PgModule, MongoModule, AuthModule, UsersModule, TablesModule],
  controllers: [AppController],
  providers: [{
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  }, AppService],
})
export class AppModule {}

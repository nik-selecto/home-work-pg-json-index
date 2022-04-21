import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Pool } from 'pg';
import { PG_CONNECTION } from './pg-constant';

const pgProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_DB,
    host: process.env.PG_HOST,
    port: +process.env.PG_PORT,
  }),
};
@Module({
  imports: [ConfigModule],
  providers: [pgProvider],
  exports: [pgProvider],
})
export class PgModule { }
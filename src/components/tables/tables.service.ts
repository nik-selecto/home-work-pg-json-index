import { Inject, Injectable } from "@nestjs/common";
import { Pool } from "pg";
import { PG_CONNECTION } from "../../general-modules/pg/pg-constant";

@Injectable()
export class TablesService {
  constructor(@Inject(PG_CONNECTION) private pg: Pool) { }

  async createTableForUser(userId: string, tableName: string) {
    const _tableName = `${this.mongoIdToAbc(userId)}__${tableName}`;
    const query = `--sql
      create table ${_tableName} (
        id serial primary key
      );
    `;

    await this.pg.query(`--sql
      drop table if exists ${_tableName};
    `);

    return this.pg.query(query);
  }

  private mongoIdToAbc(mongoId: string) {
    return mongoId.split('').filter((ch) => /[a-zA-Z]/.test(ch)).join('');
  }
}
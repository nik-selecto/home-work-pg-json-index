import { Inject, Injectable } from "@nestjs/common";
import { Pool } from "pg";
import { PG_CONNECTION } from "../../general-modules/pg/pg-constant";
import { JsonDocxampleDto } from "./dto/json-doc-example.dto";
import { JsonLeave } from "./dto/json-leave.type";

const isString = (str) => typeof str === 'string';
const isNull = (nullable) => nullable === null;
const isNumber = (num) => Number(num) === num;
const isBoolean = (bool) => typeof bool === 'boolean';
const isObject = (obj) => obj === Object(obj);
const isArray = (arr) => Array.isArray(arr);

function mockJson(j: JsonLeave) {
  if (isString(j)) {
    return 'ok';
  } else if (isBoolean(j)) {
    return true;
  } else if (isNull(j)) {
    return null;
  } else if (isNumber(j)) {
    return 777;
  } else if (isArray(j)) {
    return (j as JsonLeave[]).map((element) => mockJson(element));
  } else if (isObject(j)) {
    return Object.entries(j).reduce((acc, [k, v]) => {
      acc[k] = mockJson(v);

      return acc;
    }, {} as Record<string, JsonLeave>);
  }
}
@Injectable()
export class TablesService {
  constructor(@Inject(PG_CONNECTION) private pg: Pool) { }

  async fillTableForUser(userId: string, tableName: string, docExample: JsonDocxampleDto) {
    const _tableName = `${this.mongoIdToAbc(userId)}__${tableName}`;

    try {
      const { example, howMany } = docExample;

      for (let i = 0; i < howMany; ++i) {
        await this.pg.query(`--sql
          insert into ${_tableName}(data)
          values ('${JSON.stringify(mockJson(example))}');
        `);
      }
    } catch (error) {
      console.error(error);
      return { table: tableName, status: 'error', details: error };
    }


    return { table: tableName, status: 'ready' };
  }

  async createTableForUser(userId: string, tableName: string) {
    const _tableName = `${this.mongoIdToAbc(userId)}__${tableName}`;

    await this.pg.query(`--sql
        drop table if exists ${_tableName};
    `);
    await this.pg.query(`--sql
      create table ${_tableName} (
        id serial primary key,
        data jsonb
      );
    `);

    return { tableName };
  }

  private mongoIdToAbc(mongoId: string) {
    return mongoId.split('').filter((ch) => /[a-zA-Z]/.test(ch)).join('');
  }
}
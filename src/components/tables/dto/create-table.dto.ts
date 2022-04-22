import { Matches } from "class-validator";
export class CreateTableDto {
  @Matches(/[a-zA-Z_]+/)
  tableName: string;
}
import { Type } from "class-transformer";
import { IsNotEmpty, IsNotEmptyObject, IsString, ValidateNested } from "class-validator";
import { DataJsonbColumnDto } from "./json-doc-example.dto";

export class FillTableDto {
  @IsString()
  @IsNotEmpty()
  tableName: string;

  @ValidateNested({ each: true })
  @IsNotEmptyObject()
  @Type(() => DataJsonbColumnDto)
  data: DataJsonbColumnDto;
}
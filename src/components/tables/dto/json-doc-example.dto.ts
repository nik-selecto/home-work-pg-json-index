import { IsDefined, IsNumber } from "class-validator";
import { JsonLeave } from "./json-leave.type";

export class DataJsonbColumnDto {
  @IsNumber({ maxDecimalPlaces: 0 })
  howMany: number;

  @IsDefined()
  example: JsonLeave;
}

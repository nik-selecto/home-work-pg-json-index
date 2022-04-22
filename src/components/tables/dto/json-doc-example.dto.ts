import { IsNumber } from "class-validator";
import { JsonLeave } from "./json-leave.type";

export class JsonDocxampleDto {
  @IsNumber({ maxDecimalPlaces: 0 })
  howMany: number;

  example: JsonLeave;
}

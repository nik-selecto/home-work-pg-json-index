import { IsDate, IsEmail, IsMongoId, IsNotEmpty, IsString, Length } from "class-validator";
import { UserInterface } from "../user.interface";

export class UserDto implements UserInterface {
  @IsEmail()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  @Length(3, 32)
  password: string;

  @IsMongoId()
  _id: string;

  @IsDate()
  createdAt: string;

  @IsDate()
  updatedAt: string;
}
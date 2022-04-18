import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseMongoEntity } from "../../general-modules/mongo/mongo.base-entity";
import { MongooseDocument, mongoSchema } from "../../general-modules/mongo/mongo.schema";
import { UserInterface } from "./user.interface";

@Schema(mongoSchema())
export class User extends BaseMongoEntity implements UserInterface {
  @Prop({
    unique: true,
    required: true,
    type: String,
  })
  email: string;

  @Prop({
    required: true,
    type: String,
  })
  password: string;
}

export type UserDocument = MongooseDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);

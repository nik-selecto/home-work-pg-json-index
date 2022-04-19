import { BaseMongoInterface } from "../../general-modules/mongo/mongo.base-entity";

export interface UserInterface extends BaseMongoInterface {
  email: string;
  password: string;
}

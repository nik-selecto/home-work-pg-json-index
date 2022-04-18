import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { User, UserDocument } from "./user";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ){}

  public findAll() {
    return this.userModel.find().lean();
  }

  public findByEmail(email: string) {
    return this.userModel.findOne({ email }).lean();
  }
}
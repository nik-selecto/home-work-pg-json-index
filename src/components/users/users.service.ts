import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { ProjectConfigType } from "../../general-modules/config/config.type";
import { CreateUserDto } from "./dto/create-user.dto";
import { User, UserDocument } from "./user";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private configService: ConfigService<ProjectConfigType>,
  ){}

  public findAll() {
    return this.userModel.find().lean();
  }

  public findByEmail(email: string) {
    return this.userModel.findOne({ email }).lean();
  }

  public async registerUser(data: CreateUserDto): Promise<string> {
    const { password, ...user } = data;
    const salt = this.configService.get('SALT_USER_PASS');
    const hash = bcrypt.hashSync(password, salt);

    return this.userModel.create({ ...user, password: hash }).then((created) => created._id) as Promise<string>;
  }
}
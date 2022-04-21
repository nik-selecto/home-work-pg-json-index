import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from "../users/user";
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) { }

  public async validateUser(email: string, pass: string) {
    const user = await this.userModel.findOne({ email });

    if (!(user && bcrypt.compareSync(pass, user.password))) return null;
    
    const { password, ..._user } = user;

    return _user;
  }

  async login(user: Omit<User, 'password'>) {
    const payload = { _id: user._id, id: String(user._id) };

    return {
      access: this.jwtService.sign(payload),
    };
  }
}

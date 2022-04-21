import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { ProjectConfigType } from "../../general-modules/config/config.type";
import { User, UserDocument } from "../users/user";
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private config: ConfigService<ProjectConfigType>,
  ) { }

  public async validateUser(email: string, pass: string) {
    const user = await this.userModel.findOne({ email }).lean();

    if (!(user && bcrypt.compareSync(pass, user.password))) return null;

    const { password, ..._user } = user;

    return _user;
  }

  async login(user: Omit<User, 'password'>) {
    const payload = { id: user._id };

    return {
      access: this.jwtService.sign(payload, { secret: this.config.get('JWT_ACCESS_SECRET'), expiresIn: '40s' }),
      refresh: this.jwtService.sign(payload, { secret: this.config.get('JWT_REFRESH_SECRET'), expiresIn: '3d' }),
    };
  }

  async refresh(token: string) {
    const { id } = this.jwtService.verify(token, { secret: this.config.get('JWT_REFRESH_SECRET') });
    console.log(id);

    if (!id) throw new UnauthorizedException();


    return {
      access: this.jwtService.sign({ id }, { secret: this.config.get('JWT_ACCESS_SECRET'), expiresIn: '40s' }),
      refresh: this.jwtService.sign({ id }, { secret: this.config.get('JWT_REFRESH_SECRET'), expiresIn: '3d' }),
    };
  }
}

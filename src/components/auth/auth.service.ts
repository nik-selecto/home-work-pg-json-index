import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { User } from "../users/user";
import { UsersService } from "../users/users.service";
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  public async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);

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

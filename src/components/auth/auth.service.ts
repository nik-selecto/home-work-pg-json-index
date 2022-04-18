import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UsersService } from "../users/users.service";
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) { }

  public async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);

    if (!(user && bcrypt.compareSync(pass, user.password))) return null;
    
    const { password, ..._user } = user;

    return _user;
  }
}

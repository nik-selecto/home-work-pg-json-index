import { HttpException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  public async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    // if (!user) throw new HttpException()
  }
}
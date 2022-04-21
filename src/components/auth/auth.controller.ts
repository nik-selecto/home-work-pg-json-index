import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  public async login(@Request() req) {

    return this.authService.login(req.user);
  }
}
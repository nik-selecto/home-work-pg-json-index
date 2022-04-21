import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalGuard } from "./guards/local.guard";

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @UseGuards(LocalGuard)
  public async login(@Request() req) {

    return this.authService.login(req.user);
  }
}
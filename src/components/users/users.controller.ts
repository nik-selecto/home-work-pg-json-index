import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAccessGuard } from "../auth/guards/jwt-access.guard";
import { MeGuard } from "../auth/guards/me.guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@Controller({ path: 'users', version: '1' })
export class UsersController { 
  constructor(private usersService: UsersService) {}

  @Post()
  registerUser(@Body() data: CreateUserDto) {
    return this.usersService.registerUser(data);
  }

  @Get('me/:userId')
  @UseGuards(MeGuard)
  myProfile(@Param('userId') userId: string) {
    return this.usersService.fullUserInfo(userId);
  }

  @Get()
  @UseGuards(JwtAccessGuard)
  findAll() {
    return this.usersService.findAll();
  }
}
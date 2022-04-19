import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@Controller({ path: 'users', version: '1' })
export class UsersController { 
  constructor(private usersService: UsersService) {}

  @Post()
  registerUser(@Body() data: CreateUserDto) {
    return this.usersService.registerUser(data);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
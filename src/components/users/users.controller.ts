import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller({ path: 'users', version: '1' })
export class UsersController { 
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
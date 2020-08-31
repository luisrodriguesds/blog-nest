import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import ICreateUserDTO from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async index() {
    const users = await this.userService.findAll();
    return users;
  }

  @Post()
  async store(@Body() { name, email, password }: ICreateUserDTO) {
    const user = await this.userService.create({
      name,
      email,
      password,
    });

    return user;
  }
}

import { Controller, Get, Post, Body, Query } from '@nestjs/common';

import { CreateUserDto } from './services/user/create-user.dto';
import { UserService } from './services/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  async create(
    @Body() createUserDto: CreateUserDto,
  ): ReturnType<UserService['createUser']> {
    return this.userService.createUser(createUserDto);
  }
}

import {
  Controller,
  Post,
  Body,
  UseGuards,
  Res,
  Get,
  Req,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './services/auth.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { Response } from 'express';
import JwtAuthGuard from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registrationData: CreateUserDto) {
    return this.authService.register(registrationData);
  }

  @UseGuards(LocalAuthGuard)
  @Post('logIn')
  async logIn(@Body() userDto: UserDto, @Res() res: Response) {
    const cookie = this.authService.getCookieWithJwtToken(userDto.id);
    res.setHeader('Set-Cookie', cookie);
    return res.send(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logOut')
  async logOut(@Res() res: Response) {
    res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return res.sendStatus(200);
  }

  @UseGuards(JwtAuthGuard)
  @Get('checkJwt')
  authenticate(@Req() request: any) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}

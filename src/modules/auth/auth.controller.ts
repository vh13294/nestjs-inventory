import {
  Controller,
  Post,
  Body,
  UseGuards,
  Res,
  Get,
  Req,
} from '@nestjs/common';
import { Response } from 'express';
import { RequestWithUser } from './interface/request-with-user.interface';
import { UserDto } from './dto/user.dto';

import { AuthService } from './services/auth.service';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthAccessGuard } from './guards/jwt-auth-access.guard';
import { JwtAuthRefreshGuard } from './guards/jwt-auth-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registrationData: UserDto) {
    return this.authService.register(registrationData);
  }

  @UseGuards(LocalAuthGuard)
  @Post('log-in')
  async logIn(@Req() req: RequestWithUser, @Res() res: Response) {
    const { user } = req;

    const accessCookie = this.authService.getCookieWithJwtAccessToken(user.id);
    const {
      refreshToken,
      refreshCookie,
    } = this.authService.getCookieWithJwtRefreshToken(user.id);

    await this.authService.setCurrentRefreshToken(refreshToken, user.id);
    res.setHeader('Set-Cookie', [accessCookie, refreshCookie]);

    return res.send(user);
  }

  @UseGuards(JwtAuthAccessGuard)
  @Post('log-out')
  async logOut(@Req() req: RequestWithUser, @Res() res: Response) {
    const { user } = req;
    await this.authService.removeRefreshToken(user.id);
    res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
    return res.sendStatus(200);
  }

  @UseGuards(JwtAuthAccessGuard)
  @Get('check-jwt')
  authenticate(@Req() req: RequestWithUser) {
    const { user } = req;
    return user;
  }

  @UseGuards(JwtAuthRefreshGuard)
  @Get('refresh')
  refresh(@Req() req: RequestWithUser, @Res() res: Response) {
    const { user } = req;
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      user.id,
    );
    res.setHeader('Set-Cookie', accessTokenCookie);
    return res.send(user);
  }
}

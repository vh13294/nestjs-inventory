import { hash, compare } from 'bcrypt';

import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    // check if JWT_ENV are empty
  }

  async register(registrationData: CreateUserDto) {
    const hashedPassword = await hash(registrationData.password, 10);
    registrationData.password = hashedPassword;

    try {
      const createdUser = await this.userService.createUser(registrationData);
      // avoid returning password
      return createdUser.id;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.userService.getUserByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      // avoid returning password
      return user.id;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatching) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }

  getCookieWithJwtAccessToken(userId: number) {
    const payload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME_SECONDS}s`,
    });
    return `Authentication=${token};
            HttpOnly;
            Path=/;
            Max-Age=${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME_SECONDS}`;
  }

  getCookieWithJwtRefreshToken(userId: number) {
    const payload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME_SECONDS}s`,
    });
    const cookie = `Refresh=${token};
                    HttpOnly;
                    Path=/;
                    Max-Age=${process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME_SECONDS}`;
    return {
      refreshCookie: cookie,
      refreshToken: token,
    };
  }

  public getCookiesForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await hash(refreshToken, 10);
    await this.userService.setRefreshToken(currentHashedRefreshToken, userId);
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.userService.getUserById(userId);

    const isTokenMatching = await compare(refreshToken, user.api_token);

    if (isTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(userId: number) {
    await this.userService.removeRefreshToken(userId);
  }
}

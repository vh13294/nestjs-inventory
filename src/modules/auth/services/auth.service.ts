import { hash, compare } from 'bcrypt';

import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from '../dto/user.dto';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    const areRequiredFieldsPresented = [
      process.env.JWT_ACCESS_TOKEN_SECRET,
      process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME_SECONDS,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME_SECONDS,
    ].every((value) => value !== undefined);

    if (!areRequiredFieldsPresented) {
      throw new Error('Missing jwt in env');
    }
  }

  async register(registrationData: UserDto) {
    const hashedPassword = await hash(registrationData.password, 10);
    registrationData.password = hashedPassword;

    try {
      const {
        api_token,
        password,
        ...user
      } = await this.userService.createUser(registrationData);
      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const {
        api_token,
        password,
        ...user
      } = await this.userService.getUserByEmail(email);
      await this.verifyPassword(plainTextPassword, password);
      return user;
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

  private signPayloadToken(
    payload: TokenPayload,
    option: JwtSignOptions,
  ): string {
    const token = this.jwtService.sign(payload, option);
    return token;
  }

  getCookieWithJwtAccessToken(userId: number) {
    const token = this.signPayloadToken(
      { userId },
      {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME_SECONDS}s`,
      },
    );
    return (
      `Authentication=${token}; ` +
      'HttpOnly; ' +
      'Path=/; ' +
      `Max-Age=${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME_SECONDS}`
    );
  }

  getCookieWithJwtRefreshToken(userId: number) {
    const token = this.signPayloadToken(
      { userId },
      {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME_SECONDS}s`,
      },
    );

    const cookie =
      `Refresh=${token}; ` +
      'HttpOnly; ' +
      'Path=/; ' +
      `Max-Age=${process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME_SECONDS}`;

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
    const { api_token, password, ...user } = await this.userService.getUserById(
      userId,
    );
    const isTokenMatching = await compare(refreshToken, api_token);
    if (isTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(userId: number) {
    await this.userService.removeRefreshToken(userId);
  }

  async getUserById(userId: number) {
    const { api_token, password, ...user } = await this.userService.getUserById(
      userId,
    );
    return user;
  }
}

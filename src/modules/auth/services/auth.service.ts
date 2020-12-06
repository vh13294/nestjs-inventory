import { hash, compare } from 'bcrypt';

import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    // check if JWT_EXPIRATION_TIME && JWT_SECRET are empty
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

  getCookieWithJwtToken(userId: number) {
    const payload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token};
            HttpOnly;
            Path=/;
            Max-Age=${process.env.JWT_EXPIRATION_TIME}`;
  }

  getCookieForLogOut() {
    return `Authentication=;
            HttpOnly;
            Path=/;
            Max-Age=0`;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
    if (user) {
      return user;
    }
    throw new NotFoundException('User with this id does not exist');
  }

  async getUserByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      return user;
    }
    throw new NotFoundException('User with this email does not exist');
  }

  async createUser(userData: CreateUserDto) {
    const newUser = await this.prismaService.user.create({
      data: {
        name: '1',
        email: '1',
        password: '1',
        api_token: '1',
      },
    });
    return newUser;
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await hash(refreshToken, 10);
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        api_token: currentHashedRefreshToken,
      },
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.getUserById(userId);

    const isTokenMatching = await compare(refreshToken, user.api_token);

    if (isTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(userId: number) {
    return this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        api_token: null,
      },
    });
  }
}

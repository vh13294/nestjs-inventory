import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

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
}

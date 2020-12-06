import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';

import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from './services/user/user.service';

@Module({
  controllers: [AuthController],
  providers: [PrismaService, UserService],
  exports: [UserService],
})
export class AuthModule {}

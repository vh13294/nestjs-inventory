import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [PrismaService],
})
export class AuthModule {}

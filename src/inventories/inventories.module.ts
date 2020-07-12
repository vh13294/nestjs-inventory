import { Module } from '@nestjs/common';
import { InventoriesController } from './inventories.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [InventoriesController],
})
export class InventoriesModule { }

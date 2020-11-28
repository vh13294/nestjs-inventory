import { Module } from '@nestjs/common';

import { InventoriesController } from './inventories.controller';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInventoryService } from './services/create-inventory/create-inventory.service';
import { FindSingleLocationService } from './services/find-single-location/find-single-location.service';
import { FindAllService } from './services/find-all/find-all.service';

@Module({
  controllers: [InventoriesController],
  providers: [
    PrismaService,
    FindAllService,
    CreateInventoryService,
    FindSingleLocationService,
  ],
})
export class InventoriesModule {}

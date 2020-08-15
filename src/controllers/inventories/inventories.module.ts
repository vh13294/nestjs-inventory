import { Module } from '@nestjs/common';
import { InventoriesController } from './inventories.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CreateInventoryService } from './services/create-inventory/create-inventory.service';
import { FindSingleLocationService } from './services/find-single-location/find-single-location.service';
import { FindAllService } from './services/find-all/find-all.service';

@Module({
  imports: [PrismaModule],
  controllers: [InventoriesController],
  providers: [
    FindAllService,
    CreateInventoryService,
    FindSingleLocationService,
  ],
})
export class InventoriesModule { }

import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';
import { SignedUrlModule } from 'src/signed-url/signed-url.module';
import { signedUrlModuleConfig } from 'src/config/signed-url.config';

import { InventoriesController } from './inventories.controller';

import { CreateInventoryService } from './services/create-inventory/create-inventory.service';
import { FindSingleLocationService } from './services/find-single-location/find-single-location.service';
import { FindAllService } from './services/find-all/find-all.service';

@Module({
  imports: [
    PrismaModule,
    // SignedUrlModule.forRoot(signedUrlModuleConfig()),
    SignedUrlModule.forRootAsync({
      useFactory: () => signedUrlModuleConfig(),
    })
  ],
  controllers: [InventoriesController],
  providers: [
    FindAllService,
    CreateInventoryService,
    FindSingleLocationService,
  ],
})
export class InventoriesModule { }

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from 'src/prisma/prisma.module';
import { InventoriesModule } from './controllers/inventories/inventories.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // load .env file
    PrismaModule,
    InventoriesModule,
  ],
})
export class AppModule {}

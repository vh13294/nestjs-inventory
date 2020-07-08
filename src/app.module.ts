import { Module } from '@nestjs/common';
import { InventoriesModule } from './inventories/inventories.module';

@Module({
  imports: [InventoriesModule],
})
export class AppModule {}

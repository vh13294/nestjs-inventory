import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InventoriesModule } from './controllers/inventories/inventories.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // load .env file
    InventoriesModule,
  ],
})
export class AppModule { }


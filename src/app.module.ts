import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoriesModule } from './inventories/inventories.module';
import typeORMConfig from './config/database.config';


@Module({
  imports: [
    ConfigModule.forRoot(), // load .env file
    TypeOrmModule.forRoot(typeORMConfig()),
    InventoriesModule
  ],
})
export class AppModule { }

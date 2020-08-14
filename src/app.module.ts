import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import typeORMConfig from './config/database.config';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaModule } from './prisma/prisma.module';
import { InventoriesModule } from './controllers/inventories/inventories.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // load .env file
    // TypeOrmModule.forRoot(typeORMConfig()),
    InventoriesModule,
    PrismaModule
  ],
})
export class AppModule { }

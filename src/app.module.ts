import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RavenModule } from 'nest-raven';

import { PrismaModule } from 'src/prisma/prisma.module';
import { RavenProvider } from './config/raven.provider';
import { InventoriesModule } from './controllers/inventories/inventories.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // load .env file
    RavenModule,
    PrismaModule,
    InventoriesModule,
  ],
  providers: [RavenProvider],
})
export class AppModule {}

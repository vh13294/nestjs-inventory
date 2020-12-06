import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RavenModule } from 'nest-raven';

import { PrismaModule } from 'src/prisma/prisma.module';
import { RavenProvider } from './config/raven.provider';
import { InventoryModule } from './modules/inventory/inventory.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', './env/.env.development'],
    }), // load .env file
    RavenModule,
    PrismaModule,
    InventoryModule,
  ],
  providers: [RavenProvider],
})
export class AppModule {}

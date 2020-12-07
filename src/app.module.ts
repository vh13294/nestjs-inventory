import { Module } from '@nestjs/common';
import { RavenModule } from 'nest-raven';

import { PrismaModule } from 'src/prisma/prisma.module';
import { RavenProvider } from './config/raven.provider';
import { AuthModule } from './modules/auth/auth.module';
import { InventoryModule } from './modules/inventory/inventory.module';

@Module({
  imports: [RavenModule, PrismaModule, InventoryModule, AuthModule],
  providers: [RavenProvider],
})
export class AppModule {}

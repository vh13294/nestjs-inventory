import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SentryModule } from '@ntegral/nestjs-sentry/dist/sentry.module';

import { PrismaModule } from 'src/prisma/prisma.module';
import { sentryOptions } from './config/sentry.config';
import { InventoriesModule } from './controllers/inventories/inventories.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // load .env file
    SentryModule.forRoot(sentryOptions()),
    PrismaModule,
    InventoriesModule,
  ],
})
export class AppModule {}

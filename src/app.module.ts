import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import typeORMConfig from './config/database.config';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaModule } from './prisma/prisma.module';
import { InventoriesModule } from './controllers/inventories/inventories.module';
import { SignedUrlModule } from './signed-url/signed-url.module';
import { signedUrlModuleConfig } from './config/signed-url.config';

@Module({
  imports: [
    ConfigModule.forRoot(), // load .env file
    InventoriesModule,
    PrismaModule,
    // TypeOrmModule.forRoot(typeORMConfig()),

    SignedUrlModule.forRoot(signedUrlModuleConfig()),

    // SignedUrlModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       secret: config.get<string>('APP_KEY')
    //     } as SignedUrlModuleOptions
    //   },
    // })
  ],
})
export class AppModule { }


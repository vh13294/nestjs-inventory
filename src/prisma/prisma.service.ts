import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export type paginateWrapper<T> = {
  data: T;
  total: number;
};

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super();
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }

  paginate<T>(data: T, total: number): paginateWrapper<T> {
    return {
      data: data,
      total: total,
    };
  }
}

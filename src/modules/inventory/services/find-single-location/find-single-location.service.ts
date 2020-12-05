import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService, paginateWrapper } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { FindSingleLocationInventoryParams } from './find-single-location-inventory.params';
import {
  findSingleLocationInventory,
  findSingleLocationInventoryTransform,
  findSingleLocationSelect,
} from './find-single-location-inventory.transform';

@Injectable()
export class FindSingleLocationService {
  constructor(private readonly prismaService: PrismaService) {}

  async findSingleLocation(
    findSingleLocationInventoryParams: FindSingleLocationInventoryParams,
  ): Promise<paginateWrapper<findSingleLocationInventory[]>> {
    const inventoryFilter: Prisma.InventoryWhereInput = {
      product_id: findSingleLocationInventoryParams.productId,
      location_id: findSingleLocationInventoryParams.locationId,
    };

    const inventoryOrder: Prisma.InventoryOrderByInput[] = [
      {
        date: Prisma.SortOrder.desc,
      },
      {
        created_at: Prisma.SortOrder.desc,
      },
    ];

    const take = 5;
    const skip = findSingleLocationInventoryParams.pageNumber * take;

    try {
      const inventories = await this.prismaService.inventory.findMany({
        select: findSingleLocationSelect,
        skip: skip,
        take: take,
        where: inventoryFilter,
        orderBy: inventoryOrder,
      });

      const aggregated = await this.prismaService.inventory.aggregate({
        skip: skip,
        where: inventoryFilter,
        orderBy: inventoryOrder,
        count: true,
        sum: {
          quantity: true,
        },
      });

      const inventoriesTransformed = findSingleLocationInventoryTransform(
        inventories,
        aggregated.sum.quantity,
      );

      return this.prismaService.paginate(
        inventoriesTransformed,
        aggregated.count,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

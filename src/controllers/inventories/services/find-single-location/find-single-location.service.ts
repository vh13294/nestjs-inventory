import { Injectable } from '@nestjs/common';
import { PrismaService, paginateWrapper } from 'src/prisma/prisma.service';
import { SortOrder, InventoryWhereInput, InventoryOrderByInput } from '@prisma/client';
import { FindSingleLocationInventoryDto } from './find-single-location-inventory.dto';
import { findSingleLocationInventory, findSingleLocationInventoryTransform, findSingleLocationSelect } from './find-single-location-inventory.transform';

@Injectable()
export class FindSingleLocationService {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    async findSingleLocation(
        findSingleLocationInventoryDto: FindSingleLocationInventoryDto
    ): Promise<paginateWrapper<findSingleLocationInventory[]>> {

        const inventoryFilter: InventoryWhereInput = {
            product_id: findSingleLocationInventoryDto.productId,
            location_id: findSingleLocationInventoryDto.locationId,
        };

        const inventoryOrder: InventoryOrderByInput[] = [
            {
                date: SortOrder.desc
            },
            {
                created_at: SortOrder.desc,
            }
        ]

        const take = 5;
        const skip = findSingleLocationInventoryDto.pageNumber * take;

        const inventories = await this.prismaService.inventory.findMany({
            select: findSingleLocationSelect,
            skip: skip,
            take: take,
            where: inventoryFilter,
            orderBy: inventoryOrder,
        });

        const aggregated = await this.prismaService.inventory.aggregate({
            where: inventoryFilter,
            skip: skip,
            orderBy: inventoryOrder,
            count: true,
            sum: {
                quantity: true
            }
        });

        const inventoriesTransformed = findSingleLocationInventoryTransform(inventories, aggregated.sum.quantity);

        return this.prismaService.paginate<findSingleLocationInventory[]>(
            inventoriesTransformed,
            aggregated.count,
        );
    }
}

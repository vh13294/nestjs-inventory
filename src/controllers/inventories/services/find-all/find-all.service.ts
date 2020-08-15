import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { responseInventory, inventoryTransform } from './find-all.transform';
import { SortOrder } from '@prisma/client';

@Injectable()
export class FindAllService {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    async findAll(): Promise<responseInventory[]> {
        const inventories = await this.prismaService.inventory.findMany({
            take: 10,
            orderBy: [
                {
                    id: SortOrder.desc
                }
            ]
        });
        return inventories.map(inventoryTransform);
    }
}

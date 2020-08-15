import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInventoryDto } from './create-inventory.dto';
import { responseInventory, inventoryTransform } from './create-inventory.transform';
import { InventoryCreateInput } from '@prisma/client';

@Injectable()
export class CreateInventoryService {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    async createInventory(createInventoryDto: CreateInventoryDto): Promise<responseInventory> {
        const data: InventoryCreateInput = {
            date: createInventoryDto.date,
            quantity: createInventoryDto.quantity,
            user: {
                connect: { id: createInventoryDto.userId },
            },
            location: {
                connect: { id: createInventoryDto.locationId },
            },
            product: {
                connect: { id: createInventoryDto.productId },
            },
        }
        const inventory = await this.prismaService.inventory.create({ data: data });
        return inventoryTransform(inventory);
    }
}

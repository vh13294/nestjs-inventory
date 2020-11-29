import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInventoryDto } from './create-inventory.dto';
import {
  responseInventory,
  inventoryTransform,
} from './create-inventory.transform';
import { Prisma } from '@prisma/client';

@Injectable()
export class CreateInventoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async createInventory(
    createInventoryDto: CreateInventoryDto,
  ): Promise<responseInventory> {
    const data: Prisma.InventoryUncheckedCreateInput = {
      date: createInventoryDto.date,
      quantity: createInventoryDto.quantity,
      created_by: createInventoryDto.userId,
      location_id: createInventoryDto.locationId,
      product_id: createInventoryDto.productId,
    };
    const inventory = await this.prismaService.inventory.create({ data: data });
    return inventoryTransform(inventory);
  }
}

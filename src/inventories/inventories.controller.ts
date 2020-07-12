import { Controller, Get, Post, Body } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInventoryDto } from './validations/create-inventory.dto';
import { responseInventory, inventoryTransform } from './transforms/inventory.transform';
import { InventoryCreateInput, OrderByArg } from '@prisma/client';

@Controller('inventories')
export class InventoriesController {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    @Post()
    async create(@Body() createInventoryDto: CreateInventoryDto): Promise<responseInventory> {
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

    @Get()
    async findAll(): Promise<responseInventory[]> {
        return (await this.prismaService.inventory.findMany({
            take: 10,
            orderBy: {
                id: OrderByArg.desc
            }
        })).map(inventoryTransform);
    }

    @Get('prisma')
    async getInfo(): Promise<responseInventory[]> {
        return (await this.prismaService.inventory.findMany()).map(inventoryTransform);
    }
}

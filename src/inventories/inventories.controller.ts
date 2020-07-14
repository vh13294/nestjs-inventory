import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInventoryDto } from './query/create/create-inventory.dto';
import { responseInventory, inventoryTransform } from './query/create/inventory.transform';
import { InventoryCreateInput, OrderByArg, InventoryWhereInput } from '@prisma/client';
import { FindSingleLocationInventoryDto } from './query/find-single-location/find-single-location-inventory.dto';
import { findSingleLocationInventory, findSingleLocationInventoryTransform, findSingleLocationSelect, pagination, paginate } from './query/find-single-location/find-single-location-inventory.transform';

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
        const inventories = await this.prismaService.inventory.findMany({
            take: 10,
            orderBy: {
                id: OrderByArg.desc
            }
        });
        return inventories.map(inventoryTransform);
    }

    @Get('findSingleLocation')
    async findSingleLocation(
        @Query() findSingleLocationInventoryDto: FindSingleLocationInventoryDto
    ): Promise<pagination<findSingleLocationInventory[]>> {
        const inventoryFilter: InventoryWhereInput = {
            product_id: findSingleLocationInventoryDto.productId,
            location_id: findSingleLocationInventoryDto.locationId,
        };

        const take = 5;
        const skip = findSingleLocationInventoryDto.pageNumber * take;

        const inventories = await this.prismaService.inventory.findMany({
            select: findSingleLocationSelect,
            skip: skip,
            take: take,
            where: inventoryFilter,
            orderBy: {
                date: OrderByArg.desc,
                // created_at: OrderByArg.desc,
            },
        });

        const total = await this.prismaService.inventory.count({
            where: inventoryFilter
        });

        return paginate<findSingleLocationInventory[]>(
            inventories.map(findSingleLocationInventoryTransform),
            total,
        );
    }
}

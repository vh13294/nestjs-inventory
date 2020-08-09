import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PrismaService, paginateWrapper } from 'src/prisma/prisma.service';
import { CreateInventoryDto } from './services/create-inventory/create-inventory.dto';
import { responseInventory, inventoryTransform } from './services/create-inventory/inventory.transform';
import { InventoryCreateInput, SortOrder, InventoryWhereInput, InventoryOrderByInput } from '@prisma/client';
import { FindSingleLocationInventoryDto } from './services/find-single-location/find-single-location-inventory.dto';
import { findSingleLocationInventory, findSingleLocationInventoryTransform, findSingleLocationSelect } from './services/find-single-location/find-single-location-inventory.transform';

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
            orderBy: [
                {
                    id: SortOrder.desc
                }
            ]
        });
        return inventories.map(inventoryTransform);
    }

    @Get('findSingleLocation')
    async findSingleLocation(
        @Query() findSingleLocationInventoryDto: FindSingleLocationInventoryDto
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

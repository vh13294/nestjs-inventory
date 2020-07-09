import { Controller, Get, Req, Post, Body } from '@nestjs/common';
import { Request } from 'express';
import { InventoriesService } from './services/inventories.service';
import { Inventory } from './interfaces/inventory.interface';
import { CreateInventoryDto } from './dtos/create-inventory.dto';

@Controller('inventories')
export class InventoriesController {
    constructor(private inventoriesService: InventoriesService) { }

    @Post()
    async create(@Body() createInventoryDto: CreateInventoryDto): Promise<Inventory>  {
        return this.inventoriesService.create(createInventoryDto);
    }

    @Get()
    async findAll(): Promise<Inventory[]> {
        return this.inventoriesService.findAll();
    }

    @Get('info')
    getInfo(@Req() request: Request): string {
        return `This action returns all cats ${request.hostname}`;
    }
}

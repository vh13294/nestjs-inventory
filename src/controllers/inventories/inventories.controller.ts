import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CreateInventoryDto } from './services/create-inventory/create-inventory.dto';
import { FindSingleLocationInventoryDto } from './services/find-single-location/find-single-location-inventory.dto';
import { FindSingleLocationService } from './services/find-single-location/find-single-location.service';
import { CreateInventoryService } from './services/create-inventory/create-inventory.service';
import { FindAllService } from './services/find-all/find-all.service';

@Controller('inventories')
export class InventoriesController {
    constructor(
        private readonly findAllService: FindAllService,
        private readonly createInventoryService: CreateInventoryService,
        private readonly findSingleLocationService: FindSingleLocationService
    ) { }

    @Post()
    async create(
        @Body() createInventoryDto: CreateInventoryDto
    ): ReturnType<CreateInventoryService['createInventory']> {
        return this.createInventoryService.createInventory(createInventoryDto);
    }

    @Get()
    async findAll(): ReturnType<FindAllService['findAll']> {
        return this.findAllService.findAll();
    }

    @Get('findSingleLocation')
    async findSingleLocation(
        @Query() findSingleLocationInventoryDto: FindSingleLocationInventoryDto
    ): ReturnType<FindSingleLocationService['findSingleLocation']> {
        return this.findSingleLocationService.findSingleLocation(findSingleLocationInventoryDto);
    }
}

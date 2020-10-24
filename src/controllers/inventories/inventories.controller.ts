import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';

import { CreateInventoryDto } from './services/create-inventory/create-inventory.dto';
import { FindSingleLocationInventoryDto } from './services/find-single-location/find-single-location-inventory.dto';
import { FindSingleLocationService } from './services/find-single-location/find-single-location.service';
import { CreateInventoryService } from './services/create-inventory/create-inventory.service';
import { FindAllService } from './services/find-all/find-all.service';

import { SignedUrlService } from 'src/signed-url/signed-url-service.service';
import { SignedUrlGuard } from 'src/signed-url/signed-url-guard';

@Controller('inventories')
export class InventoriesController {
    constructor(
        private readonly signedUrlService: SignedUrlService,
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

    @Get('emailVerification')
    @UseGuards(SignedUrlGuard)
    async emailVerification(): Promise<string> {
        return '123'
    }

    @Get('testSignedUrl')
    async testSignedUrl(): Promise<string> {
        const params = {
            id: 1,
            reset: false,
            signed: 2,
        }
        const signedUrl = this.signedUrlService.signedControllerRoute(
            InventoriesController,
            InventoriesController.prototype.emailVerification,
            new Date('2021-12-12'),
            params
        )
        return signedUrl
    }
}

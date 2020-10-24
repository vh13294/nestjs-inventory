import { Controller, Get, Post, Body, Query, Req, Param, Ip, HostParam } from '@nestjs/common';
import { Request } from 'express';

import { stringify as stringifyParams } from 'querystring';
import { createHmac, timingSafeEqual } from 'crypto';

import { CreateInventoryDto } from './services/create-inventory/create-inventory.dto';
import { FindSingleLocationInventoryDto } from './services/find-single-location/find-single-location-inventory.dto';
import { FindSingleLocationService } from './services/find-single-location/find-single-location.service';
import { CreateInventoryService } from './services/create-inventory/create-inventory.service';

import { FindAllService } from './services/find-all/find-all.service';
import { SignedUrlService } from 'src/signed-url/signed-url-service.service';

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
    async emailVerification(
        @Req() request: Request,
        @Param() param: string[],
        @Query() query: Record<string, string>,
        @Ip() ip: string,
        @HostParam() hostParam: string[],

    ): Promise<unknown> {
        const test = {
            req1: request.hostname,
            req2: request.originalUrl,
            req3: request.route,
            req4: request.url,
            param: param,
            query: query,
            headers: request.headers,
            ip: ip,
            hostParam: hostParam,
        }

        const { signed, ...restQuery } = query;
        const fullUrl = `${request.headers.host}${request.route.path}?${stringifyParams(restQuery)}`

        const hmac = createHmac('sha256', '4u7x!A%D*G-KaNdRgUkXp2s5v8y/B?E(')
        hmac.update(fullUrl, 'utf8')
        const hmacValue = hmac.digest('hex')

        const isEqual = timingSafeEqual(Buffer.from(signed), Buffer.from(hmacValue))

        const currentDate = new Date()
        const expiryDate = new Date(restQuery.expirationDate)
        const hasSignatureExpired = (currentDate > expiryDate)

        return hasSignatureExpired
    }

    @Get('testSignedUrl')
    async testSignedUrl(): Promise<string> {
        const params = {
            id: 1,
            reset: false
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

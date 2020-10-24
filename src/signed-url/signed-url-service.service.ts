import { ApplicationConfig } from '@nestjs/core';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { PATH_METADATA } from '@nestjs/common/constants';
import { Controller } from '@nestjs/common/interfaces/controllers/controller.interface';

import { SignedUrlModuleOptions } from './signed-url-options.interface';
import { SIGNED_URL_MODULE_OPTIONS } from './signed-url.constants';

import { createHmac } from 'crypto';
import { stringify as stringifyParams, ParsedUrlQueryInput } from 'querystring';

@Injectable()
export class SignedUrlService {

    constructor(
        @Inject(SIGNED_URL_MODULE_OPTIONS)
        private readonly signedUrlModuleOptions: SignedUrlModuleOptions,
        private readonly applicationConfig: ApplicationConfig,
    ) {
        if (!this.signedUrlModuleOptions.secret) {
            throw new Error('The secret key must not be empty');
        } else if (this.signedUrlModuleOptions.secret.length < 32) {
            Logger.warn('[signedUrlModuleOptions] A min key length of 256-bit or 32-characters is recommended')
        }
    }

    public signedRoute(
        controller: Controller,
        controllerMethod: unknown,
        expirationDate: Date,
        params?: ParsedUrlQueryInput,
    ): string {
        const prefix = this.applicationConfig.getGlobalPrefix()
        const controllerMethodFullRoute = this.getControllerMethodRoute(controller, controllerMethod)
        const paramsStr = stringifyParams(params)

        expirationDate.toISOString()

        return this.joinRoutes(this.signedUrlModuleOptions.appUrl, prefix, controllerMethodFullRoute, paramsStr)
    }

    private getControllerMethodRoute(
        controller: Controller,
        controllerMethod: unknown,
    ): string {
        const controllerRoute = Reflect.getMetadata(PATH_METADATA, controller)
        const methodRoute = Reflect.getMetadata(PATH_METADATA, controllerMethod)
        return this.joinRoutes(controllerRoute, methodRoute)
    }

    private isRouteNotEmpty(route: string):boolean {
        return (route && route !== '/')
    }

    private joinRoutes(...routes: string[]): string {
        return routes.filter(route => this.isRouteNotEmpty(route)).join('/')
    }

    private createHmac(url: string): string {
        const hmac = createHmac('sha256', this.signedUrlModuleOptions.secret)
        hmac.update(url, 'utf8')
        return hmac.digest('hex')
    }
}

import { ApplicationConfig } from '@nestjs/core';
import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { Controller } from '@nestjs/common/interfaces/controllers/controller.interface';
import { Request } from 'express';

import { SignedUrlModuleOptions } from './signed-url-options.interface';
import { RESERVED_PARAM_NAMES, SIGNED_URL_MODULE_OPTIONS } from './signed-url.constants';

import { stringify as stringifyParams } from 'querystring';
import { appendParams, generateHmac, getControllerMethodRoute, signatureHasNotExpired, isSignatureEqual, joinRoutes, checkIfParamsHasReservedKeys } from './helpers';

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

    public signedControllerRoute(
        controller: Controller,
        controllerMethod: unknown,
        expirationDate: Date,
        params: any = {},
    ): string {
        const controllerMethodFullRoute = getControllerMethodRoute(controller, controllerMethod)

        return this.signedRelativePathUrl(
            controllerMethodFullRoute,
            expirationDate,
            params
        )
    }

    public signedRelativePathUrl(
        relativePath: string,
        expirationDate: Date,
        params: any = {},
    ): string {
        if(checkIfParamsHasReservedKeys(params)) {
            throw new ConflictException(
                `Your Query Params have a reserved parameter for signing a route. eg. [${RESERVED_PARAM_NAMES.join(', ')}]`
            );
        }
        const prefix = this.applicationConfig.getGlobalPrefix()
        params.expirationDate = expirationDate.toISOString()

        const generateURL = () => appendParams(
            joinRoutes(
                this.signedUrlModuleOptions.appUrl,
                prefix,
                relativePath,
            ),
            stringifyParams(params)
        )

        const urlWithoutHash = generateURL()
        const hmac = generateHmac(urlWithoutHash, this.signedUrlModuleOptions.secret)
        params.signed = hmac
        const urlWithHash = generateURL()
        params.key

        return urlWithHash
    }

    public isSignatureValid(request: Request, query: Record<string, string>): boolean {
        const { signed, ...restQuery } = query;
        const fullUrl = `${request.headers.host}${request.route.path}?${stringifyParams(restQuery)}`
        const hmac = generateHmac(fullUrl, this.signedUrlModuleOptions.secret)
        const expiryDate = new Date(restQuery.expirationDate)

        return isSignatureEqual(signed, hmac) && signatureHasNotExpired(expiryDate);
    }
}

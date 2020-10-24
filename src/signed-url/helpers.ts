import { createHmac, timingSafeEqual } from 'crypto';
import { PATH_METADATA } from '@nestjs/common/constants';
import { Controller } from '@nestjs/common/interfaces/controllers/controller.interface';
import { UnauthorizedException } from '@nestjs/common';
import { RESERVED_PARAM_NAMES } from './signed-url.constants';

export function getControllerMethodRoute(
    controller: Controller,
    controllerMethod: unknown,
): string {
    const controllerRoute = Reflect.getMetadata(PATH_METADATA, controller)
    const methodRoute = Reflect.getMetadata(PATH_METADATA, controllerMethod)
    return this.joinRoutes(controllerRoute, methodRoute)
}

export function isRouteNotEmpty(route: string): boolean {
    return (route && route !== '/')
}

export function joinRoutes(...routes: string[]): string {
    return routes.filter(route => this.isRouteNotEmpty(route)).join('/')
}

export function appendParams(route: string, params: string): string {
    return `${route}?${params}`
}

export function generateHmac(url: string, secret: string): string {
    const hmac = createHmac('sha256', secret)
    hmac.update(url, 'utf8')
    return hmac.digest('hex')
}

export function isSignatureEqual(signed: string, hmacValue: string): boolean {
    if (!signed || !hmacValue) {
        throw new UnauthorizedException()
    }
    return timingSafeEqual(Buffer.from(signed), Buffer.from(hmacValue))
}

export function signatureHasNotExpired(expiryDate: Date): boolean {
    const currentDate = new Date()
    return (expiryDate > currentDate)
}

export function checkIfParamsHasReservedKeys(params: Record<string, string>): boolean {
    const keyArr = Object.keys(params)
    return RESERVED_PARAM_NAMES.some(r => keyArr.includes(r))
}
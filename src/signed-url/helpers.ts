import { createHmac } from 'crypto';
import { PATH_METADATA } from '@nestjs/common/constants';
import { Controller } from '@nestjs/common/interfaces/controllers/controller.interface';

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
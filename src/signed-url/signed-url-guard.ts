import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SignedUrlService } from './signed-url-service.service';
import { Request } from 'express';

@Injectable()
export class SignedUrlGuard implements CanActivate {
    constructor(
        private readonly signedUrlService: SignedUrlService,
    ) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request, request.query);
    }

    private validateRequest(request: Request, query: Record<string, string>): boolean {
        return this.signedUrlService.isSignatureValid(request, query)
    }
}
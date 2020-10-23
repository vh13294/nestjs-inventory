import { Inject, Injectable, Logger } from '@nestjs/common';
import { SignedUrlModuleOptions } from './signed-url-options.interface';
import { SIGNED_URL_MODULE_OPTIONS } from './signed-url.constants';

@Injectable()
export class SignedUrlService {

    constructor(
        @Inject(SIGNED_URL_MODULE_OPTIONS)
        private readonly signedUrlModuleOptions: SignedUrlModuleOptions,
    ) {
        if(!this.signedUrlModuleOptions.secret) {
            throw new Error('The secret key must not be empty');
        } else if (this.signedUrlModuleOptions.secret.length < 32) {
            Logger.warn('[signedUrlModuleOptions] A min key length of 256-bit or 32-characters is recommended')
        }
    }

}

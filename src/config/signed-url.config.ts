import { SignedUrlModuleOptions } from 'nestjs-signed-url';

export function signedUrlModuleConfig(): SignedUrlModuleOptions {
    return {
        secret: process.env.APP_KEY,
        appUrl: process.env.APP_URL,
    }
};

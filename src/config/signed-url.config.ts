import { SignedUrlModuleOptions } from "src/signed-url/signed-url-options.interface";

export function signedUrlModuleConfig(): SignedUrlModuleOptions {
    return {
        secret: process.env.APP_KEY
    }
};

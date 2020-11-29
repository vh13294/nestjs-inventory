import { SentryModuleOptions } from '@ntegral/nestjs-sentry/dist/interfaces';
import { LogLevel } from '@sentry/types';

export function sentryOptions(): SentryModuleOptions {
  return {
    dsn: process.env.SENTRY_DNS,
    debug: false,
    environment: process.env.NODE_ENV,
    release: null,
    logLevel: LogLevel.Error,
  };
}

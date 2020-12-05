import { HttpException, Provider } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RavenInterceptor } from 'nest-raven';

export const RavenProvider: Provider = {
  provide: APP_INTERCEPTOR,
  useValue: new RavenInterceptor({
    filters: [
      {
        type: HttpException,
        // only catch 500+
        filter: (exception: HttpException) => 500 > exception.getStatus(),
      },
    ],
  }),
};

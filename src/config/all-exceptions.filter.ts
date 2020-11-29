import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { InjectSentry } from '@ntegral/nestjs-sentry/dist/common/sentry.decorator';
import { SentryService } from '@ntegral/nestjs-sentry/dist/services/sentry.service';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  // constructor(@InjectSentry() private readonly client: SentryService) {
  //   super();
  // }

  catch(exception: Error, host: ArgumentsHost) {
    super.catch(exception, host);

    // const ctx = host.switchToHttp();
    // const request = ctx.getRequest<Request>();
    // const response = ctx.getResponse<Response>();
    // const status = exception.getStatus();
    // const timestamp = new Date().toISOString();
    // const path = request.url;

    // const message = {
    //   request: request,
    //   response: response,
    //   status: status,
    //   timestamp: timestamp,
    //   path: path,
    // };

    // console.error(message)

    console.error(exception.message)
  }
}

import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { ApiResponseType } from 'types/global';
import { map } from 'rxjs/operators';

@Injectable()
export class RpcExceptionInterceptor<T> implements NestInterceptor {
  private logger = new Logger(RpcExceptionInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<ApiResponseType<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map((data) => {
        // Successful response
        const status = response?.statusCode || HttpStatus.OK;
        return {
          status,
          result: data,
          error: null,
        };
      }),
      catchError((e) => {
        // Error response handling
        const status = e.status || HttpStatus.INTERNAL_SERVER_ERROR;

        this.logger.debug(
          `Intercept: ${JSON.stringify(
            {
              status,
              result: null,
              error: {
                message: e.response?.message || 'Internal server error',
                details: e?.details || null,
              },
            },
            null,
            2
          )}`
        );

        throw new HttpException(
          {
            status,
            result: null,
            error: {
              message: e.response?.message || 'Internal server error',
              details: e?.details || null,
            },
          },
          status
        );
      })
    );
  }
}

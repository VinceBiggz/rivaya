import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, ip, userAgent } = request;
    const user = request.user?.id || 'anonymous';

    this.logger.log(
      `${method} ${url} - User: ${user} - IP: ${ip} - UA: ${userAgent}`
    );

    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const delay = Date.now() - now;
        
        this.logger.log(
          `${method} ${url} - ${response.statusCode} - ${delay}ms`
        );
      }),
      catchError((error) => {
        const delay = Date.now() - now;
        
        this.logger.error(
          `${method} ${url} - Error: ${error.message} - ${delay}ms`,
          error.stack
        );
        
        throw error;
      })
    );
  }
}

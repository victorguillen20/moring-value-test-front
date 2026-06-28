import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CorrelationIdService } from '../services/correlation-id.service';

export const correlationIdInterceptor: HttpInterceptorFn = (req, next) => {
  const correlationIdService = inject(CorrelationIdService);

  if (req.headers.has(correlationIdService.getCorrelationIdHeader())) {
    return next(req);
  }

  const correlationId = correlationIdService.generateId();
  const correlationReq = req.clone({
    setHeaders: {
      [correlationIdService.getCorrelationIdHeader()]: correlationId
    }
  });

  return next(correlationReq);
};

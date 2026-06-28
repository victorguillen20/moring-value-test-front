import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { CorrelationIdService } from '../services/correlation-id.service';
import { TokenService } from '../services/token.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const correlationIdService = inject(CorrelationIdService);
  const tokenService = inject(TokenService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error instanceof HttpErrorResponse) {
        handleHttpError(error, correlationIdService, tokenService);
      } else {
        console.error('Error no HTTP:', error);
      }
      return throwError(() => error);
    })
  );
};

function handleHttpError(
  error: HttpErrorResponse,
  correlationIdService: CorrelationIdService,
  tokenService: TokenService
): void {
  const status = error.status;
  const url = error.url ?? 'desconocida';
  const correlationId = error.headers?.get(correlationIdService.getCorrelationIdHeader()) ?? 'N/A';
  const shortId = correlationIdService.getShortId(correlationId);
  const message = error.error?.message ?? error.message ?? 'Error desconocido';

  if (status === 0) {
    console.error(`[Error ${shortId}] No se pudo conectar con el servidor (${url})`);
    return;
  }

  if (status === 401) {
    console.warn(`[Error ${shortId}] Sesion expirada o credenciales invalidas. Token limpiado.`);
    tokenService.clear();
    return;
  }

  if (status === 403) {
    console.warn(`[Error ${shortId}] Acceso denegado: ${message}`);
    return;
  }

  if (status === 404) {
    console.warn(`[Error ${shortId}] Recurso no encontrado: ${url}`);
    return;
  }

  if (status >= 500) {
    console.error(`[Error ${shortId}] Error del servidor (${status}): ${message}`);
    return;
  }

  if (status >= 400) {
    console.warn(`[Error ${shortId}] Error del cliente (${status}): ${message}`);
    return;
  }

  console.error(`[Error ${shortId}] Error inesperado (${status}): ${message}`);
}

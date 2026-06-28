import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { CorrelationIdService } from '../services/correlation-id.service';
import { TokenService } from '../services/token.service';
import { ToastService } from '../services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const correlationIdService = inject(CorrelationIdService);
  const tokenService = inject(TokenService);
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error instanceof HttpErrorResponse) {
        handleHttpError(error, correlationIdService, tokenService, toastService);
      }
      return throwError(() => error);
    })
  );
};

function handleHttpError(
  error: HttpErrorResponse,
  correlationIdService: CorrelationIdService,
  tokenService: TokenService,
  toastService: ToastService
): void {
  const correlationId = error.headers?.get(correlationIdService.getCorrelationIdHeader()) ?? null;
  const message = error.error?.message ?? error.message ?? 'Error desconocido';

  if (error.status === 0) {
    toastService.error('No se pudo conectar con el servidor', 'Error de red', correlationId);
    return;
  }

  if (error.status === 401) {
    toastService.warning('Sesion expirada o credenciales invalidas');
    tokenService.clear();
    return;
  }

  if (error.status === 403) {
    toastService.warning(`Acceso denegado: ${message}`, 'Acceso denegado');
    return;
  }

  if (error.status === 404) {
    toastService.warning('Recurso no encontrado', 'No encontrado');
    return;
  }

  if (error.status >= 500) {
    toastService.error(message, 'Error del servidor', correlationId);
    return;
  }

  if (error.status >= 400) {
    toastService.warning(message, 'Error');
    return;
  }
}

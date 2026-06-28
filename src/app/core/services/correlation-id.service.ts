import { Injectable, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CorrelationIdService {

  private static readonly CORRELATION_ID_HEADER = 'X-Correlation-Id';

  generateId(): string {
    return crypto.randomUUID();
  }

  getCorrelationIdHeader(): string {
    return CorrelationIdService.CORRELATION_ID_HEADER;
  }

  getFromResponse<T>(response: HttpResponse<T>): string | null {
    return response.headers.get(CorrelationIdService.CORRELATION_ID_HEADER);
  }

  getShortId(correlationId: string | null): string {
    if (!correlationId) {
      return 'N/A';
    }
    return correlationId.substring(0, 8);
  }
}

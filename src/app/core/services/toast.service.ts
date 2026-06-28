import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CorrelationIdService } from './correlation-id.service';

@Injectable({ providedIn: 'root' })
export class ToastService {

  private toastr = inject(ToastrService);
  private correlationIdService = inject(CorrelationIdService);

  success(message: string, title: string = 'Exito'): void {
    this.toastr.success(message, title);
  }

  error(message: string, title: string = 'Error', correlationId: string | null = null): void {
    const shortId = this.correlationIdService.getShortId(correlationId);
    const fullMessage = correlationId
      ? `${message} (ref: ${shortId})`
      : message;
    this.toastr.error(fullMessage, title);
  }

  warning(message: string, title: string = 'Atencion'): void {
    this.toastr.warning(message, title);
  }

  info(message: string, title: string = 'Info'): void {
    this.toastr.info(message, title);
  }
}

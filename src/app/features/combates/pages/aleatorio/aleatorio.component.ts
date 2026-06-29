import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Combate } from '../../../../models/combate.model';
import { CombateApi } from '../../../../core/api/combate.api';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-aleatorio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './aleatorio.component.html',
  styleUrl: './aleatorio.component.scss'
})
export class AleatorioComponent {

  private combateApi = inject(CombateApi);
  private toastService = inject(ToastService);

  resultado: Combate | null = null;
  loading = false;

  iniciarCombate(): void {
    this.loading = true;
    this.resultado = null;
    this.combateApi.iniciarAleatorio().subscribe({
      next: (combate) => {
        this.loading = false;
        this.resultado = combate;
        this.toastService.success('Combate aleatorio finalizado');
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        const message = error.error?.message ?? 'No se pudo iniciar el combate aleatorio';
        this.toastService.warning(message, 'Sin especies');
      }
    });
  }
}

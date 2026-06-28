import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Combate } from '../../../../models/combate.model';
import { CombateApi } from '../../../../core/api/combate.api';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss'
})
export class HistorialComponent implements OnInit {

  private combateApi = inject(CombateApi);
  private toastService = inject(ToastService);

  combates: Combate[] = [];
  loading = false;

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial(): void {
    this.loading = true;
    this.combateApi.listar().subscribe({
      next: (combates) => {
        this.combates = combates;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastService.error('No se pudo cargar el historial', 'Error', null);
      }
    });
  }
}

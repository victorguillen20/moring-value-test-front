import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Especie } from '../../../../models/especie.model';
import { EspecieApi } from '../../../../core/api/especie.api';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss'
})
export class ListaComponent implements OnInit {

  private especieApi = inject(EspecieApi);
  private toastService = inject(ToastService);

  especies: Especie[] = [];
  loading = false;

  ngOnInit(): void {
    this.cargarEspecies();
  }

  cargarEspecies(): void {
    this.loading = true;
    this.especieApi.listar().subscribe({
      next: (especies) => {
        this.especies = especies;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastService.error('No se pudieron cargar las especies', 'Error', null);
      }
    });
  }

  getNivelPoderClass(nivel: number): string {
    if (nivel >= 800) return 'badge-rank rank-gold';
    if (nivel >= 500) return 'badge-rank rank-silver';
    return 'badge-rank rank-bronze';
  }
}

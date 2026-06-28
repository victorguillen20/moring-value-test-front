import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingEntry } from '../../../../models/ranking.model';
import { RankingApi } from '../../../../core/api/ranking.api';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-ranking-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ranking-view.component.html',
  styleUrl: './ranking-view.component.scss'
})
export class RankingViewComponent implements OnInit {

  private rankingApi = inject(RankingApi);
  private toastService = inject(ToastService);

  ranking: RankingEntry[] = [];
  loading = false;
  maxVictorias = 0;

  ngOnInit(): void {
    this.cargarRanking();
  }

  cargarRanking(): void {
    this.loading = true;
    this.rankingApi.obtener().subscribe({
      next: (ranking) => {
        this.ranking = ranking;
        this.maxVictorias = ranking.length > 0 ? ranking[0].victorias : 0;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastService.error('No se pudo cargar el ranking', 'Error', null);
      }
    });
  }

  getPosicionClass(posicion: number): string {
    if (posicion === 1) return 'badge-rank rank-gold';
    if (posicion === 2) return 'badge-rank rank-silver';
    if (posicion === 3) return 'badge-rank rank-bronze';
    return 'badge-rank';
  }

  isEmpateEnPrimero(posicion: number, victorias: number): boolean {
    return posicion === 1 && victorias > 0 && this.maxVictorias === victorias;
  }
}

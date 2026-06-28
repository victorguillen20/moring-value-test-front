import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RankingEntry } from '../../models/ranking.model';

@Injectable({ providedIn: 'root' })
export class RankingApi {

  private static readonly BASE_URL = `${environment.apiUrl}/ranking`;

  private http = inject(HttpClient);

  obtener(): Observable<RankingEntry[]> {
    return this.http.get<RankingEntry[]>(RankingApi.BASE_URL);
  }
}

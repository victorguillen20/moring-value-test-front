import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Especie } from '../../models/especie.model';
import { EspecieRequest } from '../../models/especie-request.model';

@Injectable({ providedIn: 'root' })
export class EspecieApi {

  private static readonly BASE_URL = `${environment.apiUrl}/especies`;

  private http = inject(HttpClient);

  listar(): Observable<Especie[]> {
    return this.http.get<Especie[]>(EspecieApi.BASE_URL);
  }

  registrar(request: EspecieRequest): Observable<Especie> {
    return this.http.post<Especie>(EspecieApi.BASE_URL, request);
  }
}

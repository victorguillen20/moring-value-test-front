import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Combate } from '../../models/combate.model';
import { IniciarCombateRequest } from '../../models/iniciar-combate-request.model';

@Injectable({ providedIn: 'root' })
export class CombateApi {

  private static readonly BASE_URL = `${environment.apiUrl}/combates`;

  private http = inject(HttpClient);

  iniciar(request: IniciarCombateRequest): Observable<Combate> {
    return this.http.post<Combate>(CombateApi.BASE_URL, request);
  }

  iniciarAleatorio(): Observable<Combate> {
    return this.http.post<Combate>(`${CombateApi.BASE_URL}/aleatorio`, {});
  }

  listar(): Observable<Combate[]> {
    return this.http.get<Combate[]>(CombateApi.BASE_URL);
  }
}

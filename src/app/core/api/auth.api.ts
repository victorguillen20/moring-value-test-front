import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../../models/auth-response.model';
import { LoginRequest } from '../../models/login-request.model';
import { RegistroRequest } from '../../models/registro-request.model';

@Injectable({ providedIn: 'root' })
export class AuthApi {

  private static readonly BASE_URL = `${environment.apiUrl}/auth`;

  private http = inject(HttpClient);

  register(request: RegistroRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${AuthApi.BASE_URL}/register`, request);
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${AuthApi.BASE_URL}/login`, request);
  }
}

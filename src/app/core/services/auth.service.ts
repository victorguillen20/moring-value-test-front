import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../../models/auth-response.model';
import { LoginRequest } from '../../models/login-request.model';
import { RegistroRequest } from '../../models/registro-request.model';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private static readonly REGISTER_URL = `${environment.apiUrl}/auth/register`;
  private static readonly LOGIN_URL = `${environment.apiUrl}/auth/login`;

  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

  register(request: RegistroRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(AuthService.REGISTER_URL, request);
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(AuthService.LOGIN_URL, request);
  }

  logout(): void {
    this.tokenService.clear();
  }

  isAuthenticated(): boolean {
    return this.tokenService.isAuthenticated();
  }
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../../models/auth-response.model';
import { LoginRequest } from '../../models/login-request.model';
import { RegistroRequest } from '../../models/registro-request.model';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private static readonly BASE_URL = `${environment.apiUrl}/auth`;

  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  private router = inject(Router);

  register(request: RegistroRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${AuthService.BASE_URL}/register`, request).pipe(
      tap(response => this.persistSession(response))
    );
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${AuthService.BASE_URL}/login`, request).pipe(
      tap(response => this.persistSession(response))
    );
  }

  logout(): void {
    this.tokenService.clear();
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return this.tokenService.isAuthenticated();
  }

  private persistSession(response: AuthResponse): void {
    this.tokenService.setToken(response.token, response.tipo, response.expiresIn, response.username);
  }
}

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {

  private static readonly TOKEN_KEY = 'torneo_galactico_token';
  private static readonly USERNAME_KEY = 'torneo_galactico_username';
  private static readonly TOKEN_TYPE_KEY = 'torneo_galactico_token_type';
  private static readonly EXPIRES_IN_KEY = 'torneo_galactico_expires_in';

  setToken(token: string, tipo: string, expiresIn: number, username: string): void {
    try {
      sessionStorage.setItem(TokenService.TOKEN_KEY, token);
      sessionStorage.setItem(TokenService.USERNAME_KEY, username);
      sessionStorage.setItem(TokenService.TOKEN_TYPE_KEY, tipo);
      sessionStorage.setItem(TokenService.EXPIRES_IN_KEY, expiresIn.toString());
    } catch (error) {
      console.error('Error guardando token en sessionStorage:', error);
    }
  }

  getToken(): string | null {
    try {
      return sessionStorage.getItem(TokenService.TOKEN_KEY);
    } catch (error) {
      return null;
    }
  }

  getUsername(): string | null {
    try {
      return sessionStorage.getItem(TokenService.USERNAME_KEY);
    } catch (error) {
      return null;
    }
  }

  getTokenType(): string | null {
    try {
      return sessionStorage.getItem(TokenService.TOKEN_TYPE_KEY);
    } catch (error) {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  clear(): void {
    try {
      sessionStorage.removeItem(TokenService.TOKEN_KEY);
      sessionStorage.removeItem(TokenService.USERNAME_KEY);
      sessionStorage.removeItem(TokenService.TOKEN_TYPE_KEY);
      sessionStorage.removeItem(TokenService.EXPIRES_IN_KEY);
    } catch (error) {
      console.error('Error limpiando sessionStorage:', error);
    }
  }
}

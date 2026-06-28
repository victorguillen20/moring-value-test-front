import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { AuthResponse } from '../../models/auth-response.model';
import { LoginRequest } from '../../models/login-request.model';
import { RegistroRequest } from '../../models/registro-request.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpClient: jasmine.SpyObj<HttpClient>;
  let tokenService: jasmine.SpyObj<TokenService>;
  let router: jasmine.SpyObj<Router>;

  const mockResponse: AuthResponse = {
    token: 'jwt-token-123',
    tipo: 'Bearer',
    username: 'victor',
    expiresIn: 86400
  };

  beforeEach(() => {
    httpClient = jasmine.createSpyObj('HttpClient', ['post']);
    tokenService = jasmine.createSpyObj('TokenService', ['setToken', 'clear', 'isAuthenticated']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: HttpClient, useValue: httpClient },
        { provide: TokenService, useValue: tokenService },
        { provide: Router, useValue: router }
      ]
    });

    service = TestBed.inject(AuthService);
  });

  it('deberia crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('deberia llamar a POST /auth/login y persistir el token', (done) => {
    const request: LoginRequest = { username: 'victor', password: 'password123' };
    httpClient.post.and.returnValue(of(mockResponse));

    service.login(request).subscribe(() => {
      expect(httpClient.post).toHaveBeenCalledWith(
        jasmine.stringMatching(/\/auth\/login$/),
        request
      );
      expect(tokenService.setToken).toHaveBeenCalledWith(
        'jwt-token-123',
        'Bearer',
        86400,
        'victor'
      );
      done();
    });
  });

  it('deberia llamar a POST /auth/register y persistir el token', (done) => {
    const request: RegistroRequest = { username: 'victor', email: 'victor@test.com', password: 'password123' };
    httpClient.post.and.returnValue(of(mockResponse));

    service.register(request).subscribe(() => {
      expect(httpClient.post).toHaveBeenCalledWith(
        jasmine.stringMatching(/\/auth\/register$/),
        request
      );
      expect(tokenService.setToken).toHaveBeenCalled();
      done();
    });
  });

  it('deberia limpiar el token y navegar a /auth/login en logout', () => {
    service.logout();

    expect(tokenService.clear).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
  });

  it('deberia delegar isAuthenticated al TokenService', () => {
    tokenService.isAuthenticated.and.returnValue(true);
    expect(service.isAuthenticated()).toBeTrue();

    tokenService.isAuthenticated.and.returnValue(false);
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('deberia NO persistir el token si el login falla', (done) => {
    const request: LoginRequest = { username: 'victor', password: 'wrong' };
    httpClient.post.and.returnValue(throwError(() => new Error('Login failed')));

    service.login(request).subscribe({
      next: () => done.fail('deberia haber fallado'),
      error: () => {
        expect(tokenService.setToken).not.toHaveBeenCalled();
        done();
      }
    });
  });
});

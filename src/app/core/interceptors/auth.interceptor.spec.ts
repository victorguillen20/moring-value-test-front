import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { authInterceptor } from './auth.interceptor';
import { TokenService } from '../services/token.service';

describe('authInterceptor', () => {
  let tokenService: jasmine.SpyObj<TokenService>;
  let httpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    tokenService = jasmine.createSpyObj('TokenService', ['getToken']);
    httpClient = jasmine.createSpyObj('HttpClient', ['handle']);

    TestBed.configureTestingModule({
      providers: [
        { provide: TokenService, useValue: tokenService }
      ]
    });
  });

  it('deberia crearse el interceptor', () => {
    expect(typeof authInterceptor).toBe('function');
  });

  it('deberia NO agregar Authorization en /api/auth/login (path publico)', (done) => {
    tokenService.getToken.and.returnValue('jwt-token');
    const req = new HttpRequest('POST', 'http://localhost:8080/api/auth/login', {});
    const next = (r: HttpRequest<unknown>) => {
      expect(r.headers.has('Authorization')).toBeFalse();
      return of({} as HttpEvent<unknown>);
    };

    TestBed.runInInjectionContext(() => {
      authInterceptor(req, next as unknown as HttpHandler).subscribe(() => done());
    });
  });

  it('deberia NO agregar Authorization en /api/auth/register (path publico)', (done) => {
    tokenService.getToken.and.returnValue('jwt-token');
    const req = new HttpRequest('POST', 'http://localhost:8080/api/auth/register', {});
    const next = (r: HttpRequest<unknown>) => {
      expect(r.headers.has('Authorization')).toBeFalse();
      return of({} as HttpEvent<unknown>);
    };

    TestBed.runInInjectionContext(() => {
      authInterceptor(req, next as unknown as HttpHandler).subscribe(() => done());
    });
  });

  it('deberia NO agregar Authorization si no hay token', (done) => {
    tokenService.getToken.and.returnValue(null);
    const req = new HttpRequest('GET', 'http://localhost:8080/api/especies', {});
    const next = (r: HttpRequest<unknown>) => {
      expect(r.headers.has('Authorization')).toBeFalse();
      return of({} as HttpEvent<unknown>);
    };

    TestBed.runInInjectionContext(() => {
      authInterceptor(req, next as unknown as HttpHandler).subscribe(() => done());
    });
  });

  it('deberia agregar Authorization Bearer token si hay token y NO es path publico', (done) => {
    tokenService.getToken.and.returnValue('jwt-abc-123');
    const req = new HttpRequest('GET', 'http://localhost:8080/api/combates', {});
    const next = (r: HttpRequest<unknown>) => {
      expect(r.headers.get('Authorization')).toBe('Bearer jwt-abc-123');
      return of({} as HttpEvent<unknown>);
    };

    TestBed.runInInjectionContext(() => {
      authInterceptor(req, next as unknown as HttpHandler).subscribe(() => done());
    });
  });
});

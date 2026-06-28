import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { throwError } from 'rxjs';
import { errorInterceptor } from './error.interceptor';
import { TokenService } from '../services/token.service';

describe('errorInterceptor', () => {
  let tokenService: jasmine.SpyObj<TokenService>;

  beforeEach(() => {
    tokenService = jasmine.createSpyObj('TokenService', ['clear']);
    TestBed.configureTestingModule({
      providers: [{ provide: TokenService, useValue: tokenService }]
    });
  });

  it('deberia crearse el interceptor', () => {
    expect(typeof errorInterceptor).toBe('function');
  });

  it('deberia limpiar el token en error 401', (done) => {
    const req = new HttpRequest('GET', '/api/especies', {});
    const error401 = new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' });
    const next = () => throwError(() => error401);

    TestBed.runInInjectionContext(() => {
      errorInterceptor(req, next as unknown as HttpHandler).subscribe({
        error: () => {
          expect(tokenService.clear).toHaveBeenCalled();
          done();
        }
      });
    });
  });

  it('deberia NO limpiar el token en error 404', (done) => {
    const req = new HttpRequest('GET', '/api/especies/999', {});
    const error404 = new HttpErrorResponse({ status: 404, statusText: 'Not Found' });
    const next = () => throwError(() => error404);

    TestBed.runInInjectionContext(() => {
      errorInterceptor(req, next as unknown as HttpHandler).subscribe({
        error: () => {
          expect(tokenService.clear).not.toHaveBeenCalled();
          done();
        }
      });
    });
  });

  it('deberia NO limpiar el token en error 500', (done) => {
    const req = new HttpRequest('GET', '/api/especies', {});
    const error500 = new HttpErrorResponse({ status: 500, statusText: 'Server Error' });
    const next = () => throwError(() => error500);

    TestBed.runInInjectionContext(() => {
      errorInterceptor(req, next as unknown as HttpHandler).subscribe({
        error: () => {
          expect(tokenService.clear).not.toHaveBeenCalled();
          done();
        }
      });
    });
  });

  it('deberia re-lanzar el error para que lo maneje el componente', (done) => {
    const req = new HttpRequest('GET', '/api/especies', {});
    const originalError = new HttpErrorResponse({ status: 400, statusText: 'Bad Request' });
    const next = () => throwError(() => originalError);

    TestBed.runInInjectionContext(() => {
      errorInterceptor(req, next as unknown as HttpHandler).subscribe({
        next: () => done.fail('deberia haber fallado'),
        error: (err) => {
          expect(err).toBe(originalError);
          done();
        }
      });
    });
  });
});

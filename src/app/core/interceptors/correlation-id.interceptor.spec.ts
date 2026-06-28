import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHeaders, HttpHandler, HttpEvent } from '@angular/common/http';
import { of } from 'rxjs';
import { correlationIdInterceptor } from './correlation-id.interceptor';
import { CorrelationIdService } from '../services/correlation-id.service';

describe('correlationIdInterceptor', () => {
  let correlationIdService: jasmine.SpyObj<CorrelationIdService>;

  beforeEach(() => {
    correlationIdService = jasmine.createSpyObj('CorrelationIdService', [
      'getCorrelationIdHeader',
      'generateId'
    ]);
    correlationIdService.getCorrelationIdHeader.and.returnValue('X-Correlation-Id');
    correlationIdService.generateId.and.returnValue('generated-uuid-1234');

    TestBed.configureTestingModule({
      providers: [
        { provide: CorrelationIdService, useValue: correlationIdService }
      ]
    });
  });

  it('deberia crearse el interceptor', () => {
    expect(typeof correlationIdInterceptor).toBe('function');
  });

  it('deberia respetar el X-Correlation-Id existente si ya viene en el request', (done) => {
    const req = new HttpRequest('GET', '/api/especies', {
      headers: new HttpHeaders().set('X-Correlation-Id', 'existing-id-1234')
    });
    const next = (r: HttpRequest<unknown>) => {
      expect(r.headers.get('X-Correlation-Id')).toBe('existing-id-1234');
      expect(correlationIdService.generateId).not.toHaveBeenCalled();
      return of({} as HttpEvent<unknown>);
    };

    TestBed.runInInjectionContext(() => {
      correlationIdInterceptor(req, next as unknown as HttpHandler).subscribe(() => done());
    });
  });

  it('deberia generar un nuevo correlationId si NO viene en el request', (done) => {
    const req = new HttpRequest('GET', '/api/especies', {});
    const next = (r: HttpRequest<unknown>) => {
      expect(r.headers.get('X-Correlation-Id')).toBe('generated-uuid-1234');
      expect(correlationIdService.generateId).toHaveBeenCalled();
      return of({} as HttpEvent<unknown>);
    };

    TestBed.runInInjectionContext(() => {
      correlationIdInterceptor(req, next as unknown as HttpHandler).subscribe(() => done());
    });
  });
});

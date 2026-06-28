import { TestBed } from '@angular/core/testing';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { CorrelationIdService } from './correlation-id.service';

describe('CorrelationIdService', () => {
  let service: CorrelationIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CorrelationIdService]
    });
    service = TestBed.inject(CorrelationIdService);
  });

  it('deberia crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('deberia devolver el header X-Correlation-Id', () => {
    expect(service.getCorrelationIdHeader()).toBe('X-Correlation-Id');
  });

  it('deberia generar un UUID v4 valido', () => {
    const id = service.generateId();
    expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });

  it('deberia generar UUIDs unicos en cada llamada', () => {
    const id1 = service.generateId();
    const id2 = service.generateId();
    expect(id1).not.toBe(id2);
  });

  it('deberia extraer el correlationId del header de la response', () => {
    const headers = new HttpHeaders().set('X-Correlation-Id', 'abc-12345');
    const response = new HttpResponse({ headers });

    expect(service.getFromResponse(response)).toBe('abc-12345');
  });

  it('deberia devolver null si la response no tiene correlationId', () => {
    const response = new HttpResponse({ headers: new HttpHeaders() });
    expect(service.getFromResponse(response)).toBeNull();
  });

  it('deberia truncar el correlationId a 8 caracteres', () => {
    expect(service.getShortId('abcdefghijklmnop')).toBe('abcdefgh');
  });

  it('deberia devolver N/A si el correlationId es null', () => {
    expect(service.getShortId(null)).toBe('N/A');
  });
});

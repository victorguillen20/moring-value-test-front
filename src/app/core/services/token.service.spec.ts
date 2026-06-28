import { TestBed } from '@angular/core/testing';
import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenService]
    });
    service = TestBed.inject(TokenService);
    sessionStorage.clear();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('deberia crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('deberia guardar el token en sessionStorage con setToken', () => {
    service.setToken('jwt-abc', 'Bearer', 86400, 'victor');

    expect(sessionStorage.getItem('torneo_galactico_token')).toBe('jwt-abc');
    expect(sessionStorage.getItem('torneo_galactico_token_type')).toBe('Bearer');
    expect(sessionStorage.getItem('torneo_galactico_username')).toBe('victor');
    expect(sessionStorage.getItem('torneo_galactico_expires_in')).toBe('86400');
  });

  it('deberia recuperar el token con getToken', () => {
    service.setToken('jwt-xyz', 'Bearer', 86400, 'maria');
    expect(service.getToken()).toBe('jwt-xyz');
  });

  it('deberia devolver null en getToken si no hay token', () => {
    expect(service.getToken()).toBeNull();
  });

  it('deberia recuperar el username', () => {
    service.setToken('jwt-abc', 'Bearer', 86400, 'pedro');
    expect(service.getUsername()).toBe('pedro');
  });

  it('deberia recuperar el tipo de token', () => {
    service.setToken('jwt-abc', 'Bearer', 86400, 'victor');
    expect(service.getTokenType()).toBe('Bearer');
  });

  it('deberia devolver true en isAuthenticated si hay token', () => {
    service.setToken('jwt-abc', 'Bearer', 86400, 'victor');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('deberia devolver false en isAuthenticated si no hay token', () => {
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('deberia limpiar todas las claves en clear', () => {
    service.setToken('jwt-abc', 'Bearer', 86400, 'victor');
    service.clear();

    expect(sessionStorage.getItem('torneo_galactico_token')).toBeNull();
    expect(sessionStorage.getItem('torneo_galactico_token_type')).toBeNull();
    expect(sessionStorage.getItem('torneo_galactico_username')).toBeNull();
    expect(sessionStorage.getItem('torneo_galactico_expires_in')).toBeNull();
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('deberia manejar sessionStorage no disponible sin lanzar excepcion', () => {
    spyOn(sessionStorage, 'setItem').and.throwError('QuotaExceededError');
    expect(() => service.setToken('jwt', 'Bearer', 86400, 'victor')).not.toThrow();
  });
});

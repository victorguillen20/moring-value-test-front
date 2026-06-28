import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { publicGuard } from './public.guard';
import { TokenService } from '../services/token.service';

describe('publicGuard', () => {
  let tokenService: jasmine.SpyObj<TokenService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    tokenService = jasmine.createSpyObj('TokenService', ['isAuthenticated']);
    router = jasmine.createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      providers: [
        { provide: TokenService, useValue: tokenService },
        { provide: Router, useValue: router }
      ]
    });
  });

  it('deberia permitir acceso si el usuario NO esta autenticado', () => {
    tokenService.isAuthenticated.and.returnValue(false);

    const result = TestBed.runInInjectionContext(() => publicGuard({} as any, {} as any));

    expect(result).toBeTrue();
    expect(router.createUrlTree).not.toHaveBeenCalled();
  });

  it('deberia redirigir a /ranking si YA esta autenticado', () => {
    tokenService.isAuthenticated.and.returnValue(true);
    const fakeUrlTree = {} as any;
    router.createUrlTree.and.returnValue(fakeUrlTree);

    const result = TestBed.runInInjectionContext(() => publicGuard({} as any, {} as any));

    expect(result).toBe(fakeUrlTree);
    expect(router.createUrlTree).toHaveBeenCalledWith(['/ranking']);
  });
});

import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { publicGuard } from './core/guards/public.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'ranking', pathMatch: 'full' },
  { path: 'ranking', loadComponent: () => import('./features/ranking/pages/ranking-view/ranking-view.component').then(m => m.RankingViewComponent) },
  { path: 'especies', loadComponent: () => import('./features/especies/pages/lista/lista.component').then(m => m.ListaComponent) },
  { path: 'especies/nueva', canActivate: [authGuard], loadComponent: () => import('./features/especies/pages/form/form.component').then(m => m.FormComponent) },
  { path: 'auth/login', canActivate: [publicGuard], loadComponent: () => import('./features/auth/pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'auth/register', canActivate: [publicGuard], loadComponent: () => import('./features/auth/pages/register/register.component').then(m => m.RegisterComponent) },
  { path: 'combates', canActivate: [authGuard], loadComponent: () => import('./features/combates/pages/manual/manual.component').then(m => m.ManualComponent) },
  { path: 'combates/aleatorio', canActivate: [authGuard], loadComponent: () => import('./features/combates/pages/aleatorio/aleatorio.component').then(m => m.AleatorioComponent) },
  { path: 'combates/historial', canActivate: [authGuard], loadComponent: () => import('./features/combates/pages/historial/historial.component').then(m => m.HistorialComponent) }
];

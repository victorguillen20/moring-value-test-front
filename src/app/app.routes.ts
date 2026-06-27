import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'ranking', pathMatch: 'full' },
  { path: 'ranking', loadComponent: () => import('./features/ranking/pages/ranking-view/ranking-view.component').then(m => m.RankingViewComponent) },
  { path: 'especies', loadComponent: () => import('./features/especies/pages/lista/lista.component').then(m => m.ListaComponent) },
  { path: 'especies/nueva', loadComponent: () => import('./features/especies/pages/form/form.component').then(m => m.FormComponent) },
  { path: 'auth/login', loadComponent: () => import('./features/auth/pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'auth/register', loadComponent: () => import('./features/auth/pages/register/register.component').then(m => m.RegisterComponent) },
  { path: 'combates', loadComponent: () => import('./features/combates/pages/manual/manual.component').then(m => m.ManualComponent) },
  { path: 'combates/aleatorio', loadComponent: () => import('./features/combates/pages/aleatorio/aleatorio.component').then(m => m.AleatorioComponent) },
  { path: 'combates/historial', loadComponent: () => import('./features/combates/pages/historial/historial.component').then(m => m.HistorialComponent) }
];

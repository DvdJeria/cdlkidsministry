import { Routes } from '@angular/router';
import { authGuard} from "./guards/auth-guard";


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'asistencia/:id',
    loadComponent: () => import('./asistencia/asistencia.page').then((m) => m.AsistenciaPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent),
    canActivate: [authGuard]
  },
  {
    path: 'asistencia',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

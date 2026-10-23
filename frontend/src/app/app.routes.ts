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
  },
  {
    path: 'historial',
    loadComponent: () => import('./pages/historial/historial.component').then(m => m.HistorialComponent),
    canActivate: [authGuard]
  },
  {
    path: 'historial-detalle/:fecha/:cursoId',
    loadComponent: () => import('./pages/historial/historial-detalle/historial-detalle.component').then(m => m.HistorialDetalleComponent),
    canActivate: [authGuard]
  },
  {
    path: 'ninos',
    loadComponent: () => import('./pages/ninos/ninos.component').then(m => m.NinosComponent),
    canActivate: [authGuard]
  },
  {
    path: 'maestros',
    loadComponent: () => import('./pages/maestros/maestros.component').then(m => m.MaestrosComponent),
    canActivate: [authGuard]
  }
];

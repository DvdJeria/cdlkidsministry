import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificamos si hay un usuario activo en Supabase
  const user = await authService.getCurrentUser();

  if (user) {
    return true; // Permitir el paso si está logueado
  } else {
    // Si no hay sesión, redirigir al login
    router.navigate(['/login']);
    return false;
  }
};

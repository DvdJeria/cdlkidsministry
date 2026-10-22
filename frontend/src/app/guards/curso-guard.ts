import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const cursoGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Capturamos el parámetro 'id' de la URL (ej: /asistencia/1 -> id = '1')
  const cursoId = route.paramMap.get('id');

  // Catálogo de IDs válidos de tus cursos
  const validIds = ['1', '2', '3', '4'];

  // Verificamos si el ID existe y está dentro de los permitidos
  if (cursoId && validIds.includes(cursoId)) {
    return true; // Pasa sin problemas
  } else {
    // Si entran a /asistencia sin ID o con un ID inventado, los devuelve al home
    router.navigate(['/home']);
    return false;
  }
};

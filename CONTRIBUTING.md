# Contribuir a CDL Kids

Gracias por revisar o colaborar en el proyecto **CDL Kids**. Este documento resume el flujo de trabajo para mantener la base de código y la documentación ordenadas.

## Flujo de Trabajo

1. Revisa la documentación base en `docs/` (`planteamiento-y-alcance.md`, `arquitectura-y-datos.md` y `roadmap-modulos.md`).
2. Crea una rama descriptiva a partir de `main` (por ejemplo: `feat/modulo-eventos` o `docs/actualizar-esquema`).
3. Realiza los cambios manteniendo la coherencia con la arquitectura actual: frontend en Ionic/Angular conectado directamente a Supabase con RLS, sin backend intermedio.
4. Si modificas tablas, índices o políticas RLS, actualiza en conjunto los scripts en `database/kids_ministry.sql` y `database/RLS_enabled.sql`.
5. Si agregas o modificas funcionalidades, registra o actualiza el módulo correspondiente en `docs/roadmap-modulos.md`.

## Convención de Commits

Se recomienda usar mensajes claros y prefijos descriptivos:

* `feat:` nuevas funcionalidades o módulos.
* `fix:` corrección de errores.
* `docs:` cambios en `README.md` o en `docs/`.
* `chore:` mantenimiento, limpieza de archivos o configuración.
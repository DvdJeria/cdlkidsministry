# Arquitectura y Modelo de Datos - CDL Kids

## 1. Arquitectura General

El sistema **CDL Kids** opera como una aplicación web desarrollada con **Ionic** y **Angular** (con configuración base de **Capacitor**), conectada directamente a **Supabase** (PostgreSQL + Row Level Security) y desplegada en **Vercel**.

* **Sin servidor backend dedicado:** El backend de Spring Boot (`backend/cdlkids-api`) fue retirado del flujo operativo para mantener el proyecto dentro de los planes gratuitos de Vercel y Supabase.
* **Acceso directo a datos:** El frontend interactúa con PostgreSQL mediante el cliente de Supabase (`supabase.client.ts`) y los servicios de dominio (`asistencia.service.ts`, `auth.ts`, `theme.service.ts`).
* **Control de navegación y sesión:** Las rutas se protegen y validan en el frontend mediante `auth-guard` y `curso-guard`, complementadas con una única cuenta administrativa configurada directamente en Supabase.

```text
[Frontend Ionic / Angular]
   ├── Guards (auth-guard, curso-guard)
   ├── Services (asistencia.service.ts, auth.ts, supabase.client.ts, theme.service.ts)
   └── Pages (login, home, asistencia, historial, historial-detalle, admin, ninos, maestros)
           │
           ▼  (HTTPS / Supabase Client)
[Supabase - PostgreSQL + RLS]
   └── Esquema public: cursos, maestros, ninos, registros_clase, asistencias
```

---

## 2. Modelo Entidad-Relación (Esquema `public`)

El modelo de datos está compuesto por **5 tablas** en el esquema `public` de PostgreSQL:

| Tabla | Clave Primaria | Claves Foráneas | Campos Principales |
| :--- | :--- | :--- | :--- |
| `cursos` | `cur_id` | — | `cur_nombre` |
| `maestros` | `ma_id` | — | `ma_nombre`, `ma_apellido`, `is_deleted` (default `false`) |
| `ninos` | `ni_id` | `cur_id` -> `cursos(cur_id)` | `ni_nombre`, `ni_apellido`, `cur_id`, `is_deleted` (default `false`) |
| `registros_clase` | `reg_id` | `cur_id` -> `cursos(cur_id)`, `ma_id` -> `maestros(ma_id)` | `cur_id`, `ma_id`, `fecha`, `observacion_general` |
| `asistencias` | `asi_id` | `reg_id` -> `registros_clase(reg_id)`, `ni_id` -> `ninos(ni_id)` | `reg_id`, `ni_id`, `presente` (default `false`), `trajo_biblia` (default `false`) |

### Relaciones y Reglas Estructurales
* **`cursos` -> `ninos`:** Cada niño puede asociarse a un curso (`cur_id`) de los 4 niveles existentes.
* **`cursos` y `maestros` -> `registros_clase`:** Cada jornada o clase registrada (`reg_id`) vincula un curso (`cur_id`), el maestro responsable (`ma_id`), la `fecha` y una `observacion_general`.
* **`registros_clase` y `ninos` -> `asistencias`:** Cada registro de asistencia (`asi_id`) asocia un niño (`ni_id`) a una sesión de clase (`reg_id`), indicando si estuvo `presente` y si `trajo_biblia`.
* **Borrado lógico:** Las tablas `maestros` y `ninos` utilizan la columna booleana `is_deleted` (`DEFAULT false`) para conservar la integridad histórica de `registros_clase` y `asistencias`.
* **Operaciones sin política de `DELETE`:** Ninguna de las 5 tablas tiene políticas RLS de `DELETE` habilitadas en el estado actual.

---

## 3. Seguridad y Políticas RLS Vigentes

Todas las tablas del esquema `public` tienen **Row Level Security habilitado (`rls_activo = true`)** con políticas de tipo `PERMISSIVE` asignadas al rol `{public}`:

| Tabla | RLS Activo | `SELECT` (`USING`) | `INSERT` (`WITH CHECK`) | `UPDATE` (`USING` / `WITH CHECK`) | `DELETE` |
| :--- | :---: | :---: | :---: | :---: | :---: |
| `asistencias` | Sí | `true` | `true` | — | — |
| `cursos` | Sí | `true` | — | — | — |
| `maestros` | Sí | `true` | `true` | `true` / `true` | — |
| `ninos` | Sí | `true` | `true` | `true` / `true` | — |
| `registros_clase` | Sí | `true` | `true` | — | — |

### Consideraciones del Estado Actual de RLS
* **Soporte al flujo sin login en sala:** Las políticas `SELECT` e `INSERT` en `asistencias` y `registros_clase`, junto con `SELECT` en `cursos`, `maestros` y `ninos`, permiten que los maestros consulten catálogos y guarden registros de clase sin autenticación previa.
* **Operación administrativa:** Las políticas `INSERT` y `UPDATE` en `maestros` y `ninos` habilitan el alta y edición de registros (incluyendo bajas lógicas mediante `is_deleted`), mientras que las restricciones de ruta en el frontend controlan el acceso visual a las vistas administrativas.
* **Evolución futura:** Si en próximas etapas se incorporan roles diferenciados o se restringe aún más la escritura directa desde el cliente hacia Supabase, este documento y los scripts en `./database/` deberán actualizarse en conjunto.
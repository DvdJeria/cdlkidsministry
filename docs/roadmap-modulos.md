# Roadmap y Especificación de Módulos - CDL Kids

Este documento registra el estado de los módulos actuales del MVP y sirve como línea base para planificar y especificar nuevos módulos sin perder el contexto ni las reglas de negocio del sistema.

---

## 1. Módulos Implementados (MVP Actual)

### Módulo de Toma de Asistencia (`asistencia`)
* **Estado:** Implementado
* **Acceso:** Público en sala (sin autenticación previa; controlado mediante RLS en Supabase)
* **Objetivo:** Permitir que los maestros registren la asistencia por nivel/curso de forma rápida durante la jornada.
* **Comportamiento clave:**
  * Selección de nivel/curso (4 niveles disponibles).
  * Marcado de asistencia (`presente`) y control de Biblia (`trajo_biblia`) por niño.
  * Selección del maestro responsable desde la lista desplegable de maestros.
  * Registro de comentario general de la clase (`observacion_general`) y fecha (`fecha`).
  * Persistencia directa en `registros_clase` y `asistencias`.

### Módulo de Autenticación y Guardias (`login`, `auth.ts`, `auth-guard`, `curso-guard`)
* **Estado:** Implementado
* **Acceso:** Restringido para rutas administrativas
* **Objetivo:** Proteger el acceso a las funcionalidades administrativas mediante sesión con Supabase Auth (cuenta única administrada en Supabase, sin registro público).
* **Comportamiento clave:**
  * Inicio de sesión desde `/login`.
  * Validación de sesión activa y contexto de curso mediante guards de Angular/Ionic.

### Módulo de Administración (`admin`)
* **Estado:** Implementado
* **Acceso:** Autenticado (administrador)
* **Objetivo:** Centralizar la gestión operativa del ministerio infantil.
* **Comportamiento clave:**
  * Punto de entrada a la gestión de niños, gestión de maestros y consulta de historial.

### Módulo de Gestión de Niños (`ninos`)
* **Estado:** Implementado
* **Acceso:** Autenticado (administrador)
* **Objetivo:** Administrar el padrón de niños por curso manteniendo la integridad histórica.
* **Comportamiento clave:**
  * Alta y edición de datos de niños (`ni_nombre`, `ni_apellido`, `cur_id`).
  * Baja lógica mediante `is_deleted` para conservar registros previos de asistencia.

### Módulo de Gestión de Maestros (`maestros`)
* **Estado:** Implementado
* **Acceso:** Autenticado (administrador)
* **Objetivo:** Mantener el listado de maestros disponible para la operación y asignación en clases.
* **Comportamiento clave:**
  * Alta y edición de maestros (`ma_nombre`, `ma_apellido`).
  * Baja lógica mediante `is_deleted`.

### Módulo de Historial y Detalle (`historial`, `historial-detalle`)
* **Estado:** Implementado
* **Acceso:** Autenticado (administrador)
* **Objetivo:** Consultar clases registradas previamente y revisar el detalle de asistencia por jornada.
* **Comportamiento clave:**
  * Listado de registros de clase y vista detallada por sesión.

### Soporte de Apariencia / Preferencias (`theme.service.ts`)
* **Estado:** Implementado
* **Acceso:** General en frontend
* **Objetivo:** Mantener una experiencia visual adaptable y consistente en la interfaz.

---

## 2. Convención para Nuevos Módulos

Al incorporar un nuevo módulo al roadmap, completar los siguientes campos:

* **Nombre del Módulo:** Identificador claro y ruta/carpeta propuesta.
* **Estado:** `Planificado` | `En diseño` | `En desarrollo` | `Completado`
* **Prioridad:** `Alta` | `Media` | `Baja`
* **Objetivo:** Qué problema resuelve y para quién.
* **Comportamiento esperado:** Flujo principal, reglas de negocio y validaciones.
* **Impacto técnico:**
  * **Frontend:** Páginas, componentes, servicios, modelos o guards.
  * **Base de datos:** Tablas, columnas, relaciones o políticas RLS.

---

## 3. Módulos Planificados (Pendientes de Especificar)

* *Pendiente de incorporar los módulos propuestos en las siguientes iteraciones.*
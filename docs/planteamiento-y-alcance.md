# Planteamiento y Alcance del Proyecto - CDL Kids

## 1. Contexto y Problema

El ministerio infantil de la iglesia **Casa de Luz (CDL Kids)** requiere un sistema ágil y accesible para registrar la asistencia dominical o por jornada de los niños distribuidos en **4 niveles (cursos)**.

Anteriormente, el control manual dificultaba la consolidación de registros, el seguimiento de participación y la consulta histórica. El sistema resuelve esta necesidad digitalizando la toma de asistencia en sala sin fricción operativa para los maestros, centralizando además la administración de alumnos, docentes e historiales de clases.

---

## 2. Propósito del Sistema

Proveer una aplicación web responsiva que permita:

1. **Agilizar el registro en sala:** Permitir que cualquier maestro tome asistencia rápidamente desde su dispositivo móvil o computador sin procesos complejos de acceso.
2. **Registrar indicadores de clase:** Documentar la asistencia individual de cada niño, verificar si trajo su Biblia, identificar al maestro responsable de la clase mediante un selector y añadir observaciones o comentarios generales de la jornada.
3. **Centralizar la administración:** Brindar un panel protegido para gestionar los catálogos de niños y maestros, y auditar el historial detallado de clases realizadas.

---

## 3. Usuarios y Roles

El sistema opera actualmente bajo dos perfiles de uso claramente diferenciados:

| Perfil | Autenticación | Permisos y Funcionalidades |
| :--- | :--- | :--- |
| **Maestro (Operación en Sala)** | No requerida (acceso público controlado por RLS) | Seleccionar nivel/curso, marcar asistencia de niños, indicar si trajeron Biblia, seleccionar su nombre desde la lista desplegable de maestros y registrar un comentario general de la clase. |
| **Administrador** | Requerida (cuenta única gestionada en Supabase Auth) | Acceso completo al panel administrativo (`/admin`): gestión de niños (crear, editar, dar de baja), gestión de maestros y consulta del historial general y detallado de asistencias. |

---

## 4. Alcance y Restricciones del MVP

### Alcance Incluido
* **Toma de asistencia pública por nivel:** Flujo abierto para los 4 niveles existentes, optimizado para rapidez en sala.
* **Panel administrativo protegido:** Acceso restringido mediante guardias de ruta (`auth-guard` y `curso-guard`) y autenticación con Supabase.
* **Gestión de maestros y niños:** Mantenimiento de registros activos y control mediante borrado lógico.
* **Historial de clases:** Visualización de registros históricos y detalle por sesión.
* **Despliegue productivo:** Aplicación web desplegada en **Vercel** conectada directamente a **Supabase** (PostgreSQL + Row Level Security).

### Restricciones Operativas Vigentes
* **Sin registro abierto de usuarios:** No existe pantalla pública de registro (`sign up`). El acceso administrativo está centralizado en una única cuenta creada y administrada directamente desde la consola de Supabase.
* **Arquitectura sin servidor backend intermedio:** Para mantener la operación dentro de los planes gratuitos de Vercel y Supabase, se prescinde de una API intermedia (Spring Boot) y se delega el control de acceso directamente a las políticas RLS de PostgreSQL.
* **Alcance web:** Aunque el proyecto incluye configuración base de Capacitor, la distribución operativa actual del MVP es exclusivamente como aplicación web en Vercel.

---

## 5. Criterios de Éxito del MVP

* Los maestros pueden completar y guardar el registro de asistencia de cualquiera de los 4 niveles en menos de un minuto sin requerir credenciales.
* Ningún usuario no autenticado puede acceder a las vistas administrativas (`/admin`, gestión de niños, maestros o historial) ni ejecutar operaciones de modificación no autorizadas en la base de datos.
* La plataforma opera de forma estable y continua sin costos de infraestructura.
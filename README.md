# CDL Kids - Sistema de Gestión y Asistencia

Aplicación web desarrollada con **Ionic** y **Angular** (con base **Capacitor**) para el registro de asistencia por niveles, administración de niños y maestros, y consulta de historial en el ministerio infantil **Casa de Luz (CDL Kids)**.

- **Despliegue en producción:** [https://cdlkidsministry.vercel.app/](https://cdlkidsministry.vercel.app/)
- **Repositorio oficial:** [https://github.com/DvdJeria/cdlkidsministry.git](https://github.com/DvdJeria/cdlkidsministry.git)

---

## Características Principales

- **Control de Asistencia:** Registro ágil de asistencia, control de Biblia, selección de maestro y comentario general por nivel y fecha, sin requerir autenticación previa en sala.
- **Panel de Administración (`/admin`):** Acceso protegido para gestionar niños, maestros y revisar el historial y detalle de clases.
- **Soporte de Temas:** Alternancia entre modo claro y modo oscuro con persistencia mediante `ThemeService`.
- **Reportes e Impresión:** Vista optimizada (`@media print`) para imprimir o exportar listados e historiales.
- **Navegación e Identidad:** Logotipo institucional con acceso directo al flujo principal.

---

## Stack Tecnológico

| Componente | Tecnología |
| :--- | :--- |
| **Frontend** | Angular (Standalone Components) + Ionic Framework |
| **Base de Datos / BaaS** | Supabase (PostgreSQL con Row Level Security - RLS) |
| **Despliegue** | Vercel |

> **Nota de arquitectura:** El proyecto opera sin servidor backend intermedio (el backend de Spring Boot fue retirado del repositorio). El frontend se conecta directamente a Supabase utilizando políticas RLS para mantener la operación dentro de los planes gratuitos de Vercel y Supabase.

---

## Documentación del Proyecto

- **Planteamiento y alcance:** `docs/planteamiento-y-alcance.md`
- **Arquitectura y modelo de datos:** `docs/arquitectura-y-datos.md`
- **Roadmap y módulos:** `docs/roadmap-modulos.md`
- **Scripts de base de datos:** `database/kids_ministry.sql` y `database/RLS_enabled.sql`

---

## Configuración e Instalación Local

### Requisitos Previos

- Node.js (versión LTS recomendada)
- npm
- Ionic CLI (`npm install -g @ionic/cli`)

### Pasos de Instalación

1. Clonar el repositorio:
   ```bash
   git clone [https://github.com/DvdJeria/cdlkidsministry.git](https://github.com/DvdJeria/cdlkidsministry.git)
   ```

2. Acceder al directorio del proyecto y al frontend:
   ```bash
   cd cdlkidsministry/frontend
   ```

3. Instalar dependencias:
   ```bash
   npm install
   ```

4. Iniciar el servidor de desarrollo:
   ```bash
   ionic serve
   ```

El proyecto estará disponible en `http://localhost:8100/`.

---

## Estructura del Proyecto

```text
cdlkidsministry/
├── docs/
│   ├── planteamiento-y-alcance.md
│   ├── arquitectura-y-datos.md
│   └── roadmap-modulos.md
├── database/
│   ├── RLS_enabled.sql
│   └── kids_ministry.sql
├── frontend/
│   └── src/
│       └── app/
│           ├── asistencia/
│           ├── guards/
│           ├── home/
│           ├── model/
│           ├── pages/
│           │   ├── admin/
│           │   ├── historial/
│           │   │   └── historial-detalle/
│           │   ├── login/
│           │   ├── maestros/
│           │   └── ninos/
│           └── services/
└── README.md
```

---

## Integración Continua y Despliegue

El proyecto cuenta con despliegue continuo vinculada a **Vercel**, ejecutando compilaciones y despliegues automáticos ante cada actualización enviada a la rama principal (`main`).
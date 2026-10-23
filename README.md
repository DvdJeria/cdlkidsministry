# CDL Kids - Sistema de Gestión y Asistencia

Aplicación web y móvil desarrollada con **Ionic** y **Angular** para la gestión de asistencia, administración de alumnos y generación de reportes en organizaciones infantiles.

- **Despliegue en producción:** [CDL Kids en Vercel](https://cdlkidsministry.vercel.app/)
- **Repositorio oficial:** [DvdJeria/cdlkidsministry](https://github.com/DvdJeria/cdlkidsministry.git)

---

## Características Principales

- **Control de Asistencia:** Registro rápido de asistencia por grupos de edad y fecha.
- **Panel de Administración (`/admin`):** Gestión centralizada de maestros, niños y accesos.
- **Soporte de Temas:** Alternancia entre modo claro y modo oscuro con persistencia mediante `ThemeService`.
- **Reportes e Impresión:** Vista optimizada (`@media print`) para exportar listados e historiales en múltiples páginas.
- **Navegación e Identidad:** Integración de logotipo institucional con acceso directo al panel principal.

---

## Stack Tecnológico

| Componente | Tecnología |
| :--- | :--- |
| **Frontend** | Angular (Standalone Components) |
| **Framework UI** | Ionic Framework |
| **Base de Datos / BaaS** | Supabase (PostgreSQL con Row Level Security - RLS) |
| **Despliegue** | Vercel |

> **Nota de arquitectura:** La aplicación opera conectada directamente a Supabase. La API de backend dedicada no se encuentra activa en un servidor independiente por disponibilidad de infraestructura.

---

## Configuración e Instalación Local

### Requisitos Previos

- Node.js (versión LTS recomendada)
- npm
- Ionic CLI (`npm install -g @ionic/cli`)

### Pasos de Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/DvdJeria/cdlkidsministry.git
   ```

2. **Acceder al directorio del proyecto:**

   ```bash
   cd cdlkidsministry
   ```

3. **Instalar dependencias:**

   ```bash
   npm install
   ```

4. **Iniciar el servidor de desarrollo:**

   ```bash
   ionic serve
   ```

El proyecto estará disponible en `http://localhost:8100/`.

---

## Estructura del Proyecto

```text
src/
├── app/
│   ├── asistencia/
│   ├── guards/
│   ├── home/
│   ├── model/
│   ├── pages/
│   │   ├── admin/
│   │   ├── historial/
│   │   │   └── historial-detalle/
│   │   ├── login/
│   │   ├── maestros/
│   │   └── ninos/
│   └── services/
├── assets/
│   └── icon/
├── environments/
└── theme/
```

---

## Integración Continua y Despliegue

El proyecto cuenta con integración continua vinculada a **Vercel**, ejecutando despliegues automáticos ante cada actualización enviada a la rama principal (`main`).

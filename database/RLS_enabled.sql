-- ============================================================================
-- CDL Kids Ministry - Políticas de Row Level Security (RLS)
-- Esquema: public
-- Script idempotente: puede ejecutarse de forma segura más de una vez.
--
-- Contexto operativo actual (MVP sin backend intermedio):
-- - Los maestros registran clases y asistencias sin inicio de sesión previo.
-- - Las operaciones administrativas sobre niños y maestros se realizan desde el
--   frontend protegido por guardias de ruta y autenticación en Supabase.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. Habilitar Row Level Security en todas las tablas del dominio
-- ----------------------------------------------------------------------------
ALTER TABLE public.asistencias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cursos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maestros ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ninos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registros_clase ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- 2. Tabla: public.asistencias
-- Permite consultar y registrar asistencia y porte de Biblia por jornada.
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Permitir insercion de asistencias" ON public.asistencias;
CREATE POLICY "Permitir insercion de asistencias"
ON public.asistencias
AS PERMISSIVE
FOR INSERT
TO public
WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir lectura de asistencias" ON public.asistencias;
CREATE POLICY "Permitir lectura de asistencias"
ON public.asistencias
AS PERMISSIVE
FOR SELECT
TO public
USING (true);

-- ----------------------------------------------------------------------------
-- 3. Tabla: public.cursos
-- Permite lectura pública de los niveles/cursos disponibles.
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Permitir lectura publica de cursos" ON public.cursos;
CREATE POLICY "Permitir lectura publica de cursos"
ON public.cursos
AS PERMISSIVE
FOR SELECT
TO public
USING (true);

-- ----------------------------------------------------------------------------
-- 4. Tabla: public.maestros
-- Permite lectura para selectores en sala y alta/edición (incluye baja lógica).
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Permitir actualizar maestros" ON public.maestros;
CREATE POLICY "Permitir actualizar maestros"
ON public.maestros
AS PERMISSIVE
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir insertar maestros" ON public.maestros;
CREATE POLICY "Permitir insertar maestros"
ON public.maestros
AS PERMISSIVE
FOR INSERT
TO public
WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir lectura publica de maestros" ON public.maestros;
CREATE POLICY "Permitir lectura publica de maestros"
ON public.maestros
AS PERMISSIVE
FOR SELECT
TO public
USING (true);

-- ----------------------------------------------------------------------------
-- 5. Tabla: public.ninos
-- Permite lectura por curso en sala y alta/edición (incluye baja lógica).
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Permitir actualizar ninos" ON public.ninos;
CREATE POLICY "Permitir actualizar ninos"
ON public.ninos
AS PERMISSIVE
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir insertar ninos" ON public.ninos;
CREATE POLICY "Permitir insertar ninos"
ON public.ninos
AS PERMISSIVE
FOR INSERT
TO public
WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir lectura publica de ninos" ON public.ninos;
CREATE POLICY "Permitir lectura publica de ninos"
ON public.ninos
AS PERMISSIVE
FOR SELECT
TO public
USING (true);

-- ----------------------------------------------------------------------------
-- 6. Tabla: public.registros_clase
-- Permite consultar y crear sesiones/jornadas de clase con su observación.
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Permitir insercion de registros de clase" ON public.registros_clase;
CREATE POLICY "Permitir insercion de registros de clase"
ON public.registros_clase
AS PERMISSIVE
FOR INSERT
TO public
WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir lectura de registros de clase" ON public.registros_clase;
CREATE POLICY "Permitir lectura de registros de clase"
ON public.registros_clase
AS PERMISSIVE
FOR SELECT
TO public
USING (true);
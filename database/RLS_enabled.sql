-- ============================================================================
-- 1. HABILITAR ROW LEVEL SECURITY (RLS) EN LAS TABLAS
-- ============================================================================
ALTER TABLE public.asistencias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cursos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maestros ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ninos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registros_clase ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 2. POLÍTICAS RLS PARA LA TABLA: asistencias
-- ============================================================================
CREATE POLICY "Permitir insercion de asistencias"
ON public.asistencias
AS PERMISSIVE
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Permitir lectura de asistencias"
ON public.asistencias
AS PERMISSIVE
FOR SELECT
TO public
USING (true);

-- ============================================================================
-- 3. POLÍTICAS RLS PARA LA TABLA: cursos
-- ============================================================================
CREATE POLICY "Permitir lectura publica de cursos"
ON public.cursos
AS PERMISSIVE
FOR SELECT
TO public
USING (true);

-- ============================================================================
-- 4. POLÍTICAS RLS PARA LA TABLA: maestros
-- ============================================================================
CREATE POLICY "Permitir actualizar maestros"
ON public.maestros
AS PERMISSIVE
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

CREATE POLICY "Permitir insertar maestros"
ON public.maestros
AS PERMISSIVE
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Permitir lectura publica de maestros"
ON public.maestros
AS PERMISSIVE
FOR SELECT
TO public
USING (true);

-- ============================================================================
-- 5. POLÍTICAS RLS PARA LA TABLA: ninos
-- ============================================================================
CREATE POLICY "Permitir actualizar ninos"
ON public.ninos
AS PERMISSIVE
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

CREATE POLICY "Permitir insertar ninos"
ON public.ninos
AS PERMISSIVE
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Permitir lectura publica de ninos"
ON public.ninos
AS PERMISSIVE
FOR SELECT
TO public
USING (true);

-- ============================================================================
-- 6. POLÍTICAS RLS PARA LA TABLA: registros_clase
-- ============================================================================
CREATE POLICY "Permitir insercion de registros de clase"
ON public.registros_clase
AS PERMISSIVE
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Permitir lectura de registros de clase"
ON public.registros_clase
AS PERMISSIVE
FOR SELECT
TO public
USING (true);

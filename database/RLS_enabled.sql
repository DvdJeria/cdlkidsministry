-- =====================================================================
-- CONFIGURACIÓN DE ROW LEVEL SECURITY (RLS) - KIDS MINISTRY
-- =====================================================================

-- 1. Habilitar RLS en todas las tablas del esquema
ALTER TABLE cursos ENABLE ROW LEVEL SECURITY;
ALTER TABLE maestros ENABLE ROW LEVEL SECURITY;
ALTER TABLE ninos ENABLE ROW LEVEL SECURITY;
ALTER TABLE registros_clase ENABLE ROW LEVEL SECURITY;
ALTER TABLE asistencias ENABLE ROW LEVEL SECURITY;


-- =====================================================================
-- 2. TABLA: cursos (GET)
-- =====================================================================
CREATE POLICY "Permitir lectura publica de cursos" 
ON cursos 
FOR SELECT 
USING (true);


-- =====================================================================
-- 3. TABLA: maestros (GET)
-- =====================================================================
CREATE POLICY "Permitir lectura publica de maestros" 
ON maestros 
FOR SELECT 
USING (true);


-- =====================================================================
-- 4. TABLA: ninos (GET)
-- =====================================================================
CREATE POLICY "Permitir lectura publica de ninos" 
ON ninos 
FOR SELECT 
USING (true);


-- =====================================================================
-- 5. TABLA: registros_clase (GET / POST)
-- =====================================================================
CREATE POLICY "Permitir lectura de registros de clase" 
ON registros_clase 
FOR SELECT 
USING (true);

CREATE POLICY "Permitir insercion de registros de clase" 
ON registros_clase 
FOR INSERT 
WITH CHECK (true);


-- =====================================================================
-- 6. TABLA: asistencias (GET / POST)
-- =====================================================================
CREATE POLICY "Permitir lectura de asistencias" 
ON asistencias 
FOR SELECT 
USING (true);

CREATE POLICY "Permitir insercion de asistencias" 
ON asistencias 
FOR INSERT 
WITH CHECK (true);
-- 1. Tabla de Cursos (Los 4 rangos de edad)
CREATE TABLE cursos (
    cur_id SERIAL PRIMARY KEY,
    cur_nombre VARCHAR(100) NOT NULL
);

-- 2. Tabla de Maestros
CREATE TABLE maestros (
    ma_id SERIAL PRIMARY KEY,
    ma_nombre VARCHAR(150) NOT NULL,
    ma_apellido VARCHAR(150) NOT NULL
);

-- 3. Tabla de Niños (Asociados a un curso)
CREATE TABLE ninos (
    ni_id SERIAL PRIMARY KEY,
    ni_nombre VARCHAR(150) NOT NULL,
    ni_apellido VARCHAR(150) NOT NULL,
    cur_id INTEGER REFERENCES cursos(cur_id) ON DELETE CASCADE,
    is_deleted BOOLEAN DEFAULT FALSE NOT NULL
);

-- 4. Tabla de Registros de Clase (Para la observación general del día)
CREATE TABLE registros_clase (
    reg_id SERIAL PRIMARY KEY,
    cur_id INTEGER REFERENCES cursos(cur_id) ON DELETE CASCADE,
    ma_id INTEGER REFERENCES maestros(ma_id) ON DELETE SET NULL,
    fecha DATE NOT NULL,
    observacion_general TEXT
);

-- 5. Tabla de Asistencias (El detalle individual por cada niño en esa clase)
CREATE TABLE asistencias (
    asi_id SERIAL PRIMARY KEY,
    reg_id INTEGER REFERENCES registros_clase(reg_id) ON DELETE CASCADE,
    ni_id INTEGER REFERENCES ninos(ni_id) ON DELETE CASCADE,
    presente BOOLEAN DEFAULT FALSE,
    trajo_biblia BOOLEAN DEFAULT FALSE
);

-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.cursos (
  cur_id integer NOT NULL DEFAULT nextval('cursos_cur_id_seq'::regclass),
  cur_nombre character varying NOT NULL,
  CONSTRAINT cursos_pkey PRIMARY KEY (cur_id)
);
CREATE TABLE public.maestros (
  ma_id integer NOT NULL DEFAULT nextval('maestros_ma_id_seq'::regclass),
  ma_nombre character varying NOT NULL,
  ma_apellido character varying NOT NULL,
  is_deleted boolean NOT NULL DEFAULT false,
  CONSTRAINT maestros_pkey PRIMARY KEY (ma_id)
);
CREATE TABLE public.ninos (
  ni_id integer NOT NULL DEFAULT nextval('ninos_ni_id_seq'::regclass),
  ni_nombre character varying NOT NULL,
  cur_id integer,
  ni_apellido character varying NOT NULL,
  is_deleted boolean NOT NULL DEFAULT false,
  CONSTRAINT ninos_pkey PRIMARY KEY (ni_id),
  CONSTRAINT ninos_cur_id_fkey FOREIGN KEY (cur_id) REFERENCES public.cursos(cur_id)
);
CREATE TABLE public.registros_clase (
  reg_id integer NOT NULL DEFAULT nextval('registros_clase_reg_id_seq'::regclass),
  cur_id integer,
  ma_id integer,
  fecha date NOT NULL,
  observacion_general text,
  CONSTRAINT registros_clase_pkey PRIMARY KEY (reg_id),
  CONSTRAINT registros_clase_cur_id_fkey FOREIGN KEY (cur_id) REFERENCES public.cursos(cur_id),
  CONSTRAINT registros_clase_ma_id_fkey FOREIGN KEY (ma_id) REFERENCES public.maestros(ma_id)
);
CREATE TABLE public.asistencias (
  asi_id integer NOT NULL DEFAULT nextval('asistencias_asi_id_seq'::regclass),
  reg_id integer,
  ni_id integer,
  presente boolean DEFAULT false,
  trajo_biblia boolean DEFAULT false,
  CONSTRAINT asistencias_pkey PRIMARY KEY (asi_id),
  CONSTRAINT asistencias_reg_id_fkey FOREIGN KEY (reg_id) REFERENCES public.registros_clase(reg_id),
  CONSTRAINT asistencias_ni_id_fkey FOREIGN KEY (ni_id) REFERENCES public.ninos(ni_id)
);

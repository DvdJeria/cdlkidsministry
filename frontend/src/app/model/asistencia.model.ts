export interface Curso {
  cur_id: number;
  cur_nombre: string;
}

export interface Maestro {
  ma_id: number;
  ma_nombre: string;
  ma_apellido: string;
}

export interface Nino {
  ni_id: number;
  ni_nombre: string;
  ni_apellido: string;
  cur_id: number;
  // Campos auxiliares para la interfaz gráfica
  presente?: boolean;
  trajo_biblia?: boolean;
}

export interface RegistroClasePayload {
  cur_id: number;
  ma_id: number;
  fecha: string;
  observacion_general: string;
}

export interface AsistenciaItemPayload {
  reg_id: number;
  ni_id: number;
  presente: boolean;
  trajo_biblia: boolean;
}

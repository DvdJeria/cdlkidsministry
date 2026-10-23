import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { supabase } from './supabase.client';
import { Curso, Maestro, Nino } from '../model/asistencia.model';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  constructor() {}

  // 1. Obtener listado de Cursos
  obtenerCursos(): Observable<Curso[]> {
    const promise = supabase.from('cursos').select('*').order('cur_id', { ascending: true });
    return from(promise).pipe(
      map(response => {
        if (response.error) throw response.error;
        return (response.data || []) as Curso[];
      })
    );
  }

  // 2. Obtener listado de Maestros
  obtenerMaestros(): Observable<Maestro[]> {
    const promise = supabase
      .from('maestros')
      .select('*')
      .order('ma_nombre', { ascending: true })
      .not('is_deleted', 'eq', true);
    return from(promise).pipe(
      map(response => {
        if (response.error) throw response.error;
        return (response.data || []) as Maestro[];
      })
    );
  }

  // 3. Obtener niños filtrados por el ID del curso
  obtenerNinosPorCurso(cursoId: number): Observable<Nino[]> {
    const promise = supabase
      .from('ninos')
      .select('*')
      .eq('cur_id', cursoId)
      .order('ni_nombre', { ascending: true });

    return from(promise).pipe(
      map(response => {
        if (response.error) throw response.error;
        return (response.data || []) as Nino[];
      })
    );
  }

  // 4. Guardar la asistencia (Primero crea el registro de clase y luego el detalle de asistencias)
  async guardarAsistenciaCompleta(
    curId: number,
    maId: number,
    fecha: string,
    ninos: Nino[],
    observacion: string
  ): Promise<any> {
    // A. Insertar el registro de clase principal
    const { data: regData, error: regError } = await supabase
      .from('registros_clase')
      .insert([{ cur_id: curId, ma_id: maId, fecha: fecha, observacion_general: observacion }])
      .select()
      .single();

    if (regError) throw regError;

    const regId = regData.reg_id;

    // B. Preparar el arreglo con el detalle de asistencia de cada niño
    const detallesAsistencia = ninos.map(nino => ({
      reg_id: regId,
      ni_id: nino.ni_id,
      presente: !!nino.presente,
      trajo_biblia: !!nino.trajo_biblia
    }));

    // C. Insertar el detalle masivo en la tabla 'asistencias'
    const { error: asiError } = await supabase
      .from('asistencias')
      .insert(detallesAsistencia);

    if (asiError) throw asiError;

    return { success: true, regId };
  }
}

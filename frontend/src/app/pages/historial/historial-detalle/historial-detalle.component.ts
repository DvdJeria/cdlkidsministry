import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons,
  IonBackButton, IonItem, IonLabel, IonList, IonSpinner,
  IonBadge, IonCard, IonCardContent, IonText, IonButton,
  IonIcon
} from '@ionic/angular';
import { supabase } from '../../../services/supabase.client';
import { addIcons } from 'ionicons';
import { printOutline } from 'ionicons/icons';

interface DetalleAsistenciaNino {
  ni_id: number;
  nombreCompleto: string;
  presente: boolean;
  trajoBiblia: boolean;
}

@Component({
  selector: 'app-historial-detalle',
  templateUrl: './historial-detalle.component.html',
  styleUrls: ['./historial-detalle.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons,
    IonBackButton, IonItem, IonLabel, IonList, IonSpinner,
    IonBadge, IonCard, IonCardContent, IonText, IonButton,
    IonIcon
  ]
})
export class HistorialDetalleComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  fecha: string = '';
  cursoId: number = 0;
  nombreCurso: string = '';
  observacionGeneral: string = '';
  ninosAsistencia: DetalleAsistenciaNino[] = [];
  cargando: boolean = true;

  private nombresCursos: { [key: number]: string } = {
    1: '2 y 3 años',
    2: '4 a 6 años',
    3: '7 a 9 años',
    4: '10 a 12 años'
  };

  constructor() {
    addIcons({ printOutline }); // <--- Registramos el ícono
  }

  exportarPdf() {
    window.print();
  }

  async ngOnInit() {
    this.fecha = this.route.snapshot.paramMap.get('fecha') || '';
    this.cursoId = Number(this.route.snapshot.paramMap.get('cursoId')) || 0;
    this.nombreCurso = this.nombresCursos[this.cursoId] || 'Curso';

    if (this.fecha && this.cursoId) {
      await this.cargarDetalleAsistencia();
    }
  }

  async cargarDetalleAsistencia() {
    try {
      this.cargando = true;

      // 1. Obtener el registro de clase usando .limit(1) en lugar de .single() para evitar errores si hay duplicados
      const { data: regClases, error: errorReg } = await supabase
        .from('registros_clase')
        .select('reg_id, observacion_general')
        .eq('fecha', this.fecha)
        .eq('cur_id', this.cursoId)
        .limit(1);

      if (errorReg || !regClases || regClases.length === 0) {
        console.error('No se encontro el registro de clase:', errorReg?.message);
        this.cargando = false;
        return;
      }

      const regClase = regClases[0];
      this.observacionGeneral = regClase.observacion_general || 'Sin observaciones registradas.';

      // 2. Obtener todos los niños de este curso
      const { data: ninosCurso, error: errorNinos } = await supabase
        .from('ninos')
        .select('ni_id, ni_nombre, ni_apellido')
        .eq('cur_id', this.cursoId);

      if (errorNinos || !ninosCurso) {
        console.error('Error al obtener los niños del curso:', errorNinos?.message);
        this.cargando = false;
        return;
      }

      // 3. Obtener el detalle de asistencias para este reg_id
      const { data: asistencias, error: errorAsis } = await supabase
        .from('asistencias')
        .select('ni_id, presente, trajo_biblia')
        .eq('reg_id', regClase.reg_id);

      if (errorAsis) {
        console.error('Error al obtener las asistencias:', errorAsis.message);
      }

      // 4. Cruzar la información de todos los niños con su respectiva asistencia
      const mapaAsistencias = new Map<number, { presente: boolean; trajoBiblia: boolean }>();
      if (asistencias) {
        asistencias.forEach(a => {
          mapaAsistencias.set(a.ni_id, {
            presente: a.presente,
            trajoBiblia: a.trajo_biblia
          });
        });
      }

      this.ninosAsistencia = ninosCurso.map(nino => {
        const asis = mapaAsistencias.get(nino.ni_id);
        return {
          ni_id: nino.ni_id,
          nombreCompleto: `${nino.ni_nombre} ${nino.ni_apellido}`,
          presente: asis ? asis.presente : false,
          trajoBiblia: asis ? asis.trajoBiblia : false
        };
      });

    } catch (err) {
      console.error('Error inesperado al cargar el detalle:', err);
    } finally {
      this.cargando = false;
      this.cdr.detectChanges();
    }
  }
}

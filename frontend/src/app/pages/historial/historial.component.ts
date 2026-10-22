import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons,
  IonBackButton, IonAccordionGroup, IonAccordion, IonItem,
  IonLabel, IonList, IonIcon, IonText, IonSpinner
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chevronForwardOutline } from 'ionicons/icons';
import { supabase } from '../../services/supabase.client';

interface CursoAsistido {
  curId: number;
  nombre: string;
}

interface GrupoFecha {
  fecha: string;
  cursos: CursoAsistido[];
}

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons,
    IonBackButton, IonAccordionGroup, IonAccordion, IonItem,
    IonLabel, IonList, IonIcon, IonText, IonSpinner
  ]
})
export class HistorialComponent implements OnInit {
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  historialAgrupado: GrupoFecha[] = [];
  cargando: boolean = true;

  // Catálogo oficial de nombres de cursos para mostrarlos bonitos
  private nombresCursos: { [key: number]: string } = {
    1: '2 y 3 años',
    2: '4 a 6 años',
    3: '7 a 9 años',
    4: '10 a 12 años'
  };

  constructor() {
    addIcons({ chevronForwardOutline });
  }

  async ngOnInit() {
    await this.cargarHistorialDesdeSupabase();
  }

  async cargarHistorialDesdeSupabase() {
    try {
      this.cargando = true;

      // Traemos la fecha y el cur_id desde registros_clase
      const { data, error } = await supabase
        .from('registros_clase')
        .select('fecha, cur_id')
        .order('fecha', { ascending: false });

      if (error) {
        console.error('Error al obtener el historial:', error.message);
        return;
      }

      if (data && data.length > 0) {
        // Agrupamos los cursos por fecha usando un Map
        const mapaFechas = new Map<string, Set<number>>();

        data.forEach(item => {
          if (!mapaFechas.has(item.fecha)) {
            mapaFechas.set(item.fecha, new Set<number>());
          }
          mapaFechas.get(item.fecha)?.add(item.cur_id);
        });

        // Convertimos el Map a nuestra estructura final para la vista
        this.historialAgrupado = Array.from(mapaFechas.entries()).map(([fecha, cursoIds]) => ({
          fecha,
          cursos: Array.from(cursoIds).map(curId => ({
            curId,
            nombre: this.nombresCursos[curId] || `Curso ${curId}`
          }))
        }));
      }
    } catch (err) {
      console.error('Error inesperado:', err);
    } finally {
      this.cargando = false;
      this.cdr.detectChanges();
    }
  }

  verDetalleCurso(fecha: string, cursoId: number) {
    this.router.navigate(['/historial-detalle', fecha, cursoId]);
  }
}

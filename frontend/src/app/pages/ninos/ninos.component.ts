import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons,
  IonButton, IonIcon, IonList, IonItem, IonLabel, IonSpinner,
  IonModal, IonInput, IonSelect, IonSelectOption,
  IonAlert, IonAccordionGroup, IonAccordion, IonBackButton
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addOutline, createOutline, trashOutline, printOutline } from 'ionicons/icons';
import { supabase } from '../../services/supabase.client';
import { RouterLink } from '@angular/router';

interface Nino {
  ni_id?: number;
  ni_nombre: string;
  ni_apellido: string;
  cur_id: number;
  is_deleted?: boolean;

}

interface Curso {
  cur_id: number;
  cur_nombre: string;
}

@Component({
  selector: 'app-ninos',
  templateUrl: './ninos.component.html',
  styleUrls: ['./ninos.component.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons,
    IonButton, IonIcon, IonList, IonItem, IonLabel, IonSpinner,
    IonModal, IonInput, IonSelect, IonSelectOption,
    IonAlert, IonAccordionGroup, IonAccordion, IonBackButton,
    RouterLink
  ]
})
export class NinosComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  ninos: Nino[] = [];
  cursos: Curso[] = [];
  cargando: boolean = true;
  modalAbierto: boolean = false;
  guardando: boolean = false;

  // Estado del formulario modal
  esEdicion: boolean = false;
  ninoForm: Nino = {
    ni_nombre: '',
    ni_apellido: '',
    cur_id: 1
  };

  fechaImpresion: Date = new Date();

  constructor() {
    addIcons({ addOutline, createOutline, trashOutline, printOutline });
  }

  async ngOnInit() {
    await this.cargarCursos();
    await this.cargarNinos();
  }

  async cargarCursos() {
    try {
      const { data, error } = await supabase
        .from('cursos')
        .select('*')
        .order('cur_nombre', { ascending: true });

      if (error) {
        console.error('Error al cargar cursos:', error.message);
        return;
      }

      this.cursos = data || [];
    } catch (err) {
      console.error('Error inesperado al cargar cursos:', err);
    }
  }

  async cargarNinos() {
    try {
      this.cargando = true;
      const { data, error } = await supabase
        .from('ninos')
        .select('*')
        .eq('is_deleted', false)
        .order('ni_apellido', { ascending: true });

      if (error) {
        console.error('Error al cargar alumnos:', error.message);
        return;
      }

      this.ninos = data || [];
    } catch (err) {
      console.error('Error inesperado al cargar niños:', err);
    } finally {
      this.cargando = false;
      this.cdr.detectChanges();
    }
  }

  // Filtrar niños por curso para el acordeón
  obtenerNinosPorCurso(curId: number): Nino[] {
    return this.ninos.filter(n => n.cur_id === curId);
  }

  // Abrir Modal para registrar un nuevo niño (con curso preseleccionado opcional)
  abrirModalNuevo(curId?: number) {
    this.esEdicion = false;
    this.ninoForm = {
      ni_nombre: '',
      ni_apellido: '',
      cur_id: curId || (this.cursos.length > 0 ? this.cursos[0].cur_id : 1)
    };
    this.modalAbierto = true;
  }

  abrirModalEditar(nino: Nino) {
    this.esEdicion = true;
    this.ninoForm = { ...nino };
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
  }

  async guardarNino() {
    // Validar que al menos el nombre no esté vacío
    if (!this.ninoForm.ni_nombre || !this.ninoForm.ni_nombre.trim()) {
      return;
    }

    try {
      this.guardando = true;

      // Formatear los datos a enviar
      const nombreLimpio = this.ninoForm.ni_nombre.trim();
      const apellidoLimpio = this.ninoForm.ni_apellido && this.ninoForm.ni_apellido.trim() !== ''
        ? this.ninoForm.ni_apellido.trim()
        : null;
      const cursoId = Number(this.ninoForm.cur_id);

      if (this.esEdicion && this.ninoForm.ni_id) {
        // --- ACTUALIZACIÓN ---
        const { data, error } = await supabase
          .from('ninos')
          .update({
            ni_nombre: nombreLimpio,
            ni_apellido: apellidoLimpio,
            cur_id: cursoId
          })
          .eq('ni_id', Number(this.ninoForm.ni_id))
          .select();

        if (error) {
          console.error('Error al actualizar alumno:', error.message);
          return;
        }
        console.log('Alumno actualizado con éxito:', data);

      } else {
        // --- INSERCIÓN ---
        const { data, error } = await supabase
          .from('ninos')
          .insert([
            {
              ni_nombre: nombreLimpio,
              ni_apellido: apellidoLimpio,
              cur_id: cursoId,
              is_deleted: false // Soft delete por defecto en false
            }
          ])
          .select();

        if (error) {
          console.error('Error al registrar alumno:', error.message);
          return;
        }
        console.log('Nuevo alumno insertado con éxito:', data);
      }

      // Cerrar modal y refrescar la lista
      this.cerrarModal();
      await this.cargarNinos();

    } catch (err) {
      console.error('Error inesperado al guardar:', err);
    } finally {
      this.guardando = false;
      this.cdr.detectChanges();
    }
  }

  async confirmarSoftDelete(nino: Nino) {
    if (!nino.ni_id) return;

    try {
      const { error } = await supabase
        .from('ninos')
        .update({ is_deleted: true })
        .eq('ni_id', nino.ni_id);

      if (error) {
        console.error('Error al dar de baja:', error.message);
        return;
      }

      await this.cargarNinos();
    } catch (err) {
      console.error('Error inesperado en soft delete:', err);
    }
  }

  imprimirListado() {
    this.fechaImpresion = new Date();
    window.print();
  }
}

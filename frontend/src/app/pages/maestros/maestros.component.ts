import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons,
  IonButton, IonIcon, IonList, IonItem, IonLabel, IonSpinner,
  IonModal, IonInput, IonAlert, IonBackButton
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addOutline, createOutline, trashOutline, printOutline } from 'ionicons/icons';
import { supabase } from '../../services/supabase.client';
import { RouterLink } from '@angular/router';

interface Maestro {
  ma_id?: number;
  ma_nombre: string;
  ma_apellido: string;
  is_deleted?: boolean;
}

@Component({
  selector: 'app-maestros',
  templateUrl: './maestros.component.html',
  styleUrls: ['./maestros.component.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons,
    IonButton, IonIcon, IonList, IonItem, IonLabel, IonSpinner,
    IonModal, IonInput, IonAlert, IonBackButton, RouterLink
  ]
})
export class MaestrosComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  maestros: Maestro[] = [];
  cargando: boolean = true;
  modalAbierto: boolean = false;
  guardando: boolean = false;

  esEdicion: boolean = false;
  maestroForm: Maestro = {
    ma_nombre: '',
    ma_apellido: ''
  };

  constructor() {
    addIcons({ addOutline, createOutline, trashOutline, printOutline });
  }

  async ngOnInit() {
    await this.cargarMaestros();
  }

  async cargarMaestros() {
    try {
      this.cargando = true;
      const { data, error } = await supabase
        .from('maestros')
        .select('*')
        .eq('is_deleted', false)
        .order('ma_apellido', { ascending: true });

      if (error) {
        console.error('Error al cargar maestros:', error.message);
        return;
      }

      this.maestros = data || [];
    } catch (err) {
      console.error('Error inesperado al cargar maestros:', err);
    } finally {
      this.cargando = false;
      this.cdr.detectChanges();
    }
  }

  trackByMaestroId(index: number, maestro: Maestro): number {
    return maestro.ma_id || index;
  }

  abrirModalNuevo() {
    this.esEdicion = false;
    this.maestroForm = {
      ma_nombre: '',
      ma_apellido: ''
    };
    this.modalAbierto = true;
  }

  abrirModalEditar(maestro: Maestro) {
    this.esEdicion = true;
    this.maestroForm = { ...maestro };
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
  }

  async guardarMaestro() {
    if (!this.maestroForm.ma_nombre || !this.maestroForm.ma_nombre.trim() ||
      !this.maestroForm.ma_apellido || !this.maestroForm.ma_apellido.trim()) {
      return;
    }

    try {
      this.guardando = true;
      const nombreLimpio = this.maestroForm.ma_nombre.trim();
      const apellidoLimpio = this.maestroForm.ma_apellido.trim();

      if (this.esEdicion && this.maestroForm.ma_id) {
        const { error } = await supabase
          .from('maestros')
          .update({
            ma_nombre: nombreLimpio,
            ma_apellido: apellidoLimpio
          })
          .eq('ma_id', Number(this.maestroForm.ma_id));

        if (error) {
          console.error('Error al actualizar maestro:', error.message);
          return;
        }
      } else {
        const { error } = await supabase
          .from('maestros')
          .insert([{
            ma_nombre: nombreLimpio,
            ma_apellido: apellidoLimpio,
            is_deleted: false
          }]);

        if (error) {
          console.error('Error al registrar maestro:', error.message);
          return;
        }
      }

      this.cerrarModal();
      await this.cargarMaestros();
    } catch (err) {
      console.error('Error al guardar maestro:', err);
    } finally {
      this.guardando = false;
      this.cdr.detectChanges();
    }
  }

  async confirmarSoftDelete(maestro: Maestro) {
    if (!maestro.ma_id) return;

    try {
      const { error } = await supabase
        .from('maestros')
        .update({ is_deleted: true })
        .eq('ma_id', Number(maestro.ma_id));

      if (error) {
        console.error('Error al dar de baja al maestro:', error.message);
        return;
      }

      await this.cargarMaestros();
    } catch (err) {
      console.error('Error inesperado en soft delete:', err);
    }
  }

  imprimirListado() {
    window.print();
  }
}

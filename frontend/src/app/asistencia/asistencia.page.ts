import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AsistenciaService } from '../services/asistencia.service';
import { Maestro, Nino } from '../model/asistencia.model';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonText,
  IonCheckbox,
  IonTextarea,
  IonButton,
  IonIcon
} from '@ionic/angular';

import { addIcons } from 'ionicons';
import { logInOutline } from 'ionicons/icons';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonText,
    IonCheckbox,
    IonTextarea,
    IonButton,
    IonIcon,
    RouterLink
  ]
})
export class AsistenciaPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private asistenciaService = inject(AsistenciaService);
  private cdr = inject(ChangeDetectorRef);

  cursoId!: number;
  maestros: Maestro[] = [];
  maestroId: number | null = null;
  ninos: Nino[] = [];
  fechaClase: string = '';
  observacion: string = '';
  guardando: boolean = false;

  constructor() {
    // Registramos el icono del login para que Ionic lo renderice correctamente
    addIcons({ logInOutline });
  }

  ngOnInit() {
    const today = new Date();
    this.fechaClase = today.toISOString().split('T')[0];

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.cursoId = Number(idParam);
      this.cargarMaestros();
      this.cargarNinos();
    }
  }

  cargarMaestros() {
    this.asistenciaService.obtenerMaestros().subscribe({
      next: (data) => {
        this.maestros = data;
        if (this.maestros.length > 0) {
          this.maestroId = this.maestros[0].ma_id;
        }
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar maestros:', err)
    });
  }

  cargarNinos() {
    this.asistenciaService.obtenerNinosPorCurso(this.cursoId).subscribe({
      next: (data) => {
        this.ninos = data.map(n => ({
          ...n,
          presente: false,
          trajo_biblia: false
        }));
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar niños:', err)
    });
  }

  async guardarAsistencia() {
    if (!this.maestroId) {
      alert('Por favor selecciona un maestro a cargo.');
      return;
    }

    // Validar que al menos un niño esté marcado como presente
    const hayPresentes = this.ninos.some(n => n.presente);
    if (!hayPresentes) {
      alert('No se puede guardar la asistencia si ningún niño está presente.');
      return;
    }

    try {
      this.guardando = true;
      this.cdr.detectChanges();

      await this.asistenciaService.guardarAsistenciaCompleta(
        this.cursoId,
        this.maestroId,
        this.fechaClase,
        this.ninos,
        this.observacion
      );

      alert('¡Asistencia guardada con éxito!');
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error al guardar la asistencia:', error);
      alert('Ocurrió un error al guardar la asistencia.');
    } finally {
      this.guardando = false;
      this.cdr.detectChanges();
    }
  }
}

import { Component, OnInit, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AsistenciaService } from '../services/asistencia.service';
import { Maestro, Nino } from '../model/asistencia.model';
import {IonicModule} from "@ionic/angular/lazy";

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
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

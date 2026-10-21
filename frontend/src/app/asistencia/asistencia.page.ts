import { Component, OnInit, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AsistenciaService } from '../services/asistencia.service';
import { Maestro, Nino } from '../model/asistencia.model';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AsistenciaPage implements OnInit {
  cursoId!: number;
  maestros: Maestro[] = [];
  maestroId: number | null = null;
  ninos: Nino[] = [];
  fechaClase: string = '';
  guardando: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private asistenciaService: AsistenciaService,
    private cdr: ChangeDetectorRef
  ) {}

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

    try {
      this.guardando = true;
      this.cdr.detectChanges();

      await this.asistenciaService.guardarAsistenciaCompleta(
        this.cursoId,
        this.maestroId,
        this.fechaClase,
        this.ninos
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

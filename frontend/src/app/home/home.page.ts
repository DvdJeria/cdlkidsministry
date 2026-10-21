import { Component, OnInit, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AsistenciaService } from '../services/asistencia.service';
import { Curso } from '../model/asistencia.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {
  cursos: Curso[] = [];
  cargando: boolean = true;

  constructor(
    private asistenciaService: AsistenciaService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarCursos();
  }

  cargarCursos() {
    this.cargando = true;
    this.asistenciaService.obtenerCursos().subscribe({
      next: (data) => {
        console.log('Cursos obtenidos desde Supabase:', data);
        this.cursos = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar cursos:', err);
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  seleccionarCurso(curso: Curso) {
    if (curso && curso.cur_id) {
      this.router.navigate(['/asistencia', curso.cur_id]);
    }
  }
}

import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AsistenciaService } from '../services/asistencia.service';
import { Curso } from '../model/asistencia.model';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonButton
} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonButton
]
})

export class HomePage implements OnInit {

  private asistenciaService = inject(AsistenciaService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  cursos: Curso[] = [];
  cargando: boolean = true;

  constructor() {}

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

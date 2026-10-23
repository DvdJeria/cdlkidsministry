import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AsistenciaService } from '../services/asistencia.service';
import { Curso } from '../model/asistencia.model';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonButton,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonIcon
} from '@ionic/angular';

import { addIcons } from 'ionicons';
import { logInOutline, sunnyOutline, moonOutline } from 'ionicons/icons';
import { ThemeService} from "../services/theme.service";

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
  IonButton,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    RouterLink
]
})

export class HomePage implements OnInit {

  private asistenciaService = inject(AsistenciaService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  cursos: Curso[] = [];
  cargando: boolean = true;

  public themeService = inject(ThemeService);

  constructor() {
    addIcons({ logInOutline, sunnyOutline, moonOutline });
  }

  ngOnInit() {
    this.cargarCursos();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
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

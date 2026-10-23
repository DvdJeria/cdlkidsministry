import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons,
  IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonIcon
} from '@ionic/angular';
import { AuthService } from '../../services/auth';
import { addIcons } from 'ionicons';
import { addOutline, createOutline, trashOutline, printOutline, logOutOutline, sunnyOutline, moonOutline, } from 'ionicons/icons';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [
    CommonModule, RouterLink, IonContent, IonHeader, IonTitle, IonToolbar,
    IonButtons, IonButton, IonCard, IonCardHeader, IonCardTitle,
    IonCardContent, IonIcon
  ]
})
export class AdminComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  public themeService = inject(ThemeService);

  constructor() {
    addIcons({ addOutline, createOutline, trashOutline, printOutline, logOutOutline, sunnyOutline, moonOutline });
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}

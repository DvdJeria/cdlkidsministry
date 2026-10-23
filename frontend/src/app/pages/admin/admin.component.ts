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
import { addOutline, createOutline, trashOutline, printOutline, logOutOutline } from 'ionicons/icons';

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

  constructor() {
    addIcons({ addOutline, createOutline, trashOutline, printOutline, logOutOutline });
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}

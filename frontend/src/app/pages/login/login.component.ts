import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonItem,
  IonLabel, IonInput, IonButton, IonButtons, IonBackButton,
  IonToast, IonCard, IonCardContent, IonCardHeader, IonCardTitle
} from '@ionic/angular';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonContent, IonHeader, IonTitle,
    IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonButtons,
    IonBackButton, IonToast, IonCard, IonCardContent, IonCardHeader, IonCardTitle
  ]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  showToast: boolean = false;
  isLoading: boolean = false;

  async onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      this.showToast = true;
      return;
    }

    this.isLoading = true;
    const { error } = await this.authService.login(this.email, this.password);
    this.isLoading = false;

    if (error) {
      this.errorMessage = 'Credenciales incorrectas o usuario no autorizado.';
      this.showToast = true;
    } else {
      // Redirige a la vista administrativa tras el éxito
      this.router.navigate(['/admin']);
    }
  }
}

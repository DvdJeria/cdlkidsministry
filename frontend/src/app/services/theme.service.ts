import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = false;

  constructor() {
    this.initTheme();
  }

  // Inicializa el tema según la preferencia guardada o la del sistema operativo
  private initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
    } else {
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.applyTheme();
  }

  // Aplica la clase correspondiente a la etiqueta HTML / Body
  private applyTheme() {
    document.documentElement.classList.toggle('ion-palette-dark', this.isDarkMode);
    document.documentElement.classList.toggle('dark', this.isDarkMode);
  }

  // Alterna entre modo claro y oscuro
  toggleTheme(): boolean {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
    return this.isDarkMode;
  }

  // Obtiene el estado actual del modo oscuro
  get darkMode(): boolean {
    return this.isDarkMode;
  }
}

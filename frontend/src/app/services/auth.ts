import { Injectable } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { supabase } from './supabase.client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Iniciar sesión con email ficticio y clave
  async login(email: string, pass: string) {
    return await supabase.auth.signInWithPassword({
      email: email,
      password: pass
    });
  }

  // Cerrar sesión
  async logout() {
    return await supabase.auth.signOut();
  }

  // Obtener usuario activo
  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }
}

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Usuario {
  correo: string
  clave: string
  rol: 'tecnico' | 'admin' | 'cliente'
  nombre: string
}

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})

export class Login {
  private router = inject(Router)

  correo = ''
  clave = ''
  
  enviado = false
  errorCredenciales = false

  private usuarios: Usuario[] = [
    { correo: 'tecnico@exxoda.pe', clave: '123456', rol: 'tecnico', nombre: 'Pedro Pérez'},
    { correo: 'admin@exxoda.pe', clave: '123456', rol: 'tecnico', nombre: 'Juan Pérez'},
    { correo: 'cliente@manpowergroup.pe', clave: '123456', rol: 'tecnico', nombre: 'Victor Aguirre'}
  ]

  private inicioPorRol: Record<Usuario['rol'], string> = {
    tecnico: '/pendientes',
    admin: '/admin/panel',
    cliente: '/mis-solicitudes'
  }

  ingresar(): void {
    this.enviado = true;
    this.errorCredenciales = false;
  
    if (!this.correo.trim() || !this.clave) return;

    const usuario = this.usuarios.find(
      u => u.correo === this.correo.trim() && u.clave === this.clave
    );

    if (!usuario) {
      this.errorCredenciales = true;
      return;
    }

    sessionStorage.setItem('usuario', JSON.stringify(usuario));
    this.router.navigate([this.inicioPorRol[usuario.rol]]);
  }

}

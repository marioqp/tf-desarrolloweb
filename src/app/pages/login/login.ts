import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { tecnicos } from '../../data/datos';

interface Usuario {
  correo: string
  clave: string
  rol: 'tecnico' | 'admin' | 'cliente'
  nombre: string
  tecnicoId?: number
  clienteId?: number
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

  // Usuarios fijos de prueba
  private usuarios: Usuario[] = [
    { correo: 'admin@exxoda.pe', clave: '123456', rol: 'admin', nombre: 'Juan Pérez'},
    { correo: 'cliente@manpowergroup.pe', clave: '123456', rol: 'cliente', nombre: 'Victor Aguirre', clienteId: 1}
  ]

  private inicioPorRol: Record<Usuario['rol'], string> = {
    tecnico: '/tecnico/pendientes',
    admin: '/admin/panel',
    cliente: '/cliente'
  }

  ingresar(): void {
    this.enviado = true;
    this.errorCredenciales = false;
  
    if (!this.correo.trim() || !this.clave) return;

    // Los técnicos salen de datos.ts, así también pueden entrar los que registra el administrador
    const usuariosTecnicos: Usuario[] = tecnicos.map(t => ({
      correo: t.correo, clave: t.clave, rol: 'tecnico', nombre: `${t.nombre} ${t.apellidos}`, tecnicoId: t.id
    }));

    const usuario = [...this.usuarios, ...usuariosTecnicos].find(
      u => u.correo === this.correo.trim() && u.clave === this.clave
    );

    if (!usuario) {
      this.errorCredenciales = true;
      return;
    }

    const { clave, ...datosSesion } = usuario;   // no guardamos la contraseña
    sessionStorage.setItem('usuario', JSON.stringify(datosSesion));
    this.router.navigate([this.inicioPorRol[usuario.rol]]);
  }

}

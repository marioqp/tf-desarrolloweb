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

// Integrantes del equipo: cada uno tiene una cuenta de administrador y una de cliente.
// Sus cuentas de técnico están en datos.ts (lista "tecnicos").
// clienteId = número del cliente en datos.ts (lista "clientes")
const INTEGRANTES = [
  { nombre: 'Adrian',   usuario: 'adrian',   correoCliente: 'adrian_cliente@manpowergroup.pe', clienteId: 1 },
  { nombre: 'Mario',    usuario: 'mario',    correoCliente: 'mario_cliente@alicorp.com.pe',    clienteId: 7 },
  { nombre: 'Jesus',    usuario: 'jesus',    correoCliente: 'jesus_cliente@interbank.pe',      clienteId: 8 },
  { nombre: 'Giordano', usuario: 'giordano', correoCliente: 'giordano_cliente@upc.edu.pe',     clienteId: 9 },
  { nombre: 'Doylith',  usuario: 'doylith',  correoCliente: 'doylith_cliente@rimac.com.pe',    clienteId: 6 },
];

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

  // Cuentas de administrador y cliente (fijas + las de cada integrante)
  private usuarios: Usuario[] = [
    { correo: 'admin@exxoda.pe', clave: '123456', rol: 'admin', nombre: 'Juan Pérez' },
    { correo: 'cliente@manpowergroup.pe', clave: '123456', rol: 'cliente', nombre: 'Victor Aguirre', clienteId: 1 },
    ...INTEGRANTES.flatMap((p): Usuario[] => [
      { correo: `${p.usuario}_admin@exxoda.pe`, clave: '123456', rol: 'admin', nombre: p.nombre },
      { correo: p.correoCliente, clave: '123456', rol: 'cliente', nombre: p.nombre, clienteId: p.clienteId }
    ])
  ]

  private inicioPorRol: Record<Usuario['rol'], string> = {
    tecnico: '/tecnico/pendientes',
    admin: '/admin/panel',
    cliente: '/cliente'
  }

  etiquetaRol: Record<Usuario['rol'], string> = {
    admin: 'Administrador',
    tecnico: 'Técnico',
    cliente: 'Cliente'
  }

  // Los técnicos salen de datos.ts, así también pueden entrar los que registra el administrador
  private usuariosTecnicos(): Usuario[] {
    return tecnicos.map(t => ({
      correo: t.correo, clave: t.clave, rol: 'tecnico', nombre: `${t.nombre} ${t.apellidos}`.trim(), tecnicoId: t.id
    }));
  }

  // Todas las cuentas, ordenadas por rol para mostrarlas en el desplegable
  cuentasDemo(): Usuario[] {
    const orden = { admin: 0, tecnico: 1, cliente: 2 };
    return [...this.usuarios, ...this.usuariosTecnicos()].sort((a, b) => orden[a.rol] - orden[b.rol]);
  }

  // Al hacer clic en una cuenta del desplegable se rellenan correo y contraseña
  usarCuenta(cuenta: Usuario): void {
    this.correo = cuenta.correo;
    this.clave = cuenta.clave;
    this.errorCredenciales = false;
    this.enviado = false;
  }

  ingresar(): void {
    this.enviado = true;
    this.errorCredenciales = false;

    if (!this.correo.trim() || !this.clave) return;

    const correo = this.correo.trim().toLowerCase();
    const usuario = this.cuentasDemo().find(
      u => u.correo.toLowerCase() === correo && u.clave === this.clave
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
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { tecnicos } from '../../../data/datos';

@Component({
  imports: [FormsModule],
  selector: 'app-registrar-tecnico',
  styleUrl: './registrar-tecnico.css',
  templateUrl: './registrar-tecnico.html',
})
export class RegistrarTecnico {
  tecnicos=tecnicos

  nombre = ''
  apellidos = ''
  correo = ''
  clave = ''

  enviado = false
  errorCorreo = ''
  exito = ''

  guardar(): void {
    this.enviado = true
    this.errorCorreo = ''
    this.exito = ''

    if (!this.nombre.trim() || !this.apellidos.trim() || !this.correo.trim() || !this.clave)
      return;

    const correo = this.correo.trim().toLowerCase();
    if (this.tecnicos.some(t => t.correo.toLowerCase() === correo)) {
      this.errorCorreo = 'El correo ya está registrado.'
      return
    }

    const nuevoId = Math.max(0, ...this.tecnicos.map(t => t.id)) + 1
    this.tecnicos.push({
      id: nuevoId,
      nombre: this.nombre.trim(),
      apellidos: this.apellidos.trim(),
      correo: this.correo.trim(),
      clave: this.clave
    })
    this.exito = `${this.nombre.trim()} ${this.apellidos.trim()} fue registrado.`

    this.nombre = this.apellidos = this.correo = this.clave = ''
    this.enviado = false
  }
}

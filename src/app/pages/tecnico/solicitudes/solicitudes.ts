import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { claseEstado, clasePrioridad, nombreCliente, nombreTecnico, solicitudes, usuarioActual } from '../../../data/datos';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-solicitudes',
  styleUrl: './solicitudes.css',
  templateUrl: './solicitudes.html',
})
export class Solicitudes {
  tecnicoActual = usuarioActual()?.tecnicoId ?? null;

  busqueda = '';
  estado = '';
  tipo = '';
  prioridad = '';
  soloMias = false;

  solicitudes = solicitudes;

  nombreCliente = nombreCliente;
  nombreTecnico = nombreTecnico;
  claseEstado = claseEstado;
  clasePrioridad = clasePrioridad;

  // HU09: buscar y filtrar
  filtrar() {
    let resultado = [];
    for (let s of this.solicitudes) {
      let mostrar = true;

      if (this.busqueda != '' && !s.codigo.toLowerCase().includes(this.busqueda.toLowerCase())) {
        mostrar = false;
      }
      if (this.estado != '' && s.estado != this.estado) {
        mostrar = false;
      }
      if (this.tipo != '' && s.tipo != this.tipo) {
        mostrar = false;
      }
      if (this.prioridad != '' && s.prioridad != this.prioridad) {
        mostrar = false;
      }
      // HU13: solo las solicitudes del técnico que inició sesión
      if (this.soloMias && s.tecnicoId != this.tecnicoActual) {
        mostrar = false;
      }

      if (mostrar) {
        resultado.push(s);
      }
    }
    return resultado;
  }

  cantidadMias() {
    let cantidad = 0;
    for (let s of this.solicitudes) {
      if (s.tecnicoId == this.tecnicoActual && (s.estado == 'En atención' || s.estado == 'En espera')) {
        cantidad++;
      }
    }
    return cantidad;
  }

  limpiar() {
    this.busqueda = '';
    this.estado = '';
    this.tipo = '';
    this.prioridad = '';
  }
}

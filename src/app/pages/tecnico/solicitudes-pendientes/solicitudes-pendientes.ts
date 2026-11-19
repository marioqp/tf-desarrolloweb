import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Prioridad, clasePrioridad, fechaComoNumero, nombreCliente, solicitudes, usuarioActual } from '../../../data/datos';

@Component({
  imports: [RouterLink],
  selector: 'app-solicitudes-pendientes',
  styleUrl: './solicitudes-pendientes.css',
  templateUrl: './solicitudes-pendientes.html',
})
export class SolicitudesPendientes {
  mensaje = '';

  nombreCliente = nombreCliente;
  clasePrioridad = clasePrioridad;

  // HU10: pendientes ordenadas primero por prioridad y luego de la más antigua a la más reciente
  pendientes() {
    const orden: Record<Prioridad, number> = { 'Alta': 0, 'Media': 1, 'Baja': 2 };
    return solicitudes
      .filter(s => s.estado === 'Pendiente')
      .sort((a, b) => orden[a.prioridad] - orden[b.prioridad] || fechaComoNumero(a.fecha) - fechaComoNumero(b.fecha));
  }

  cantidadAltas() {
    let cantidad = 0;
    for (let s of this.pendientes()) {
      if (s.prioridad == 'Alta') {
        cantidad++;
      }
    }
    return cantidad;
  }

  // HU11: tomar una solicitud
  tomar(codigo: string) {
    if (confirm('¿Tomar la solicitud ' + codigo + '?')) {
      const solicitud = solicitudes.find(s => s.codigo === codigo);
      if (!solicitud || solicitud.estado !== 'Pendiente') {
        this.mensaje = 'Esta solicitud ya fue tomada por otro técnico.';
        return;
      }
      solicitud.estado = 'En atención';
      solicitud.tecnicoId = usuarioActual()?.tecnicoId ?? null;
      this.mensaje = 'Tomaste la solicitud ' + codigo;
    }
  }
}

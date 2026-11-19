import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  Solicitud, claseEstado, clasePrioridad, fechaComoNumero, fechaHoraAhora, fechaHoy,
  nombreCliente, nombreTecnico, solicitudes, usuarioActual
} from '../../../data/datos';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-detalle-solicitud',
  styleUrl: './detalle-solicitud.css',
  templateUrl: './detalle-solicitud.html',
})
export class DetalleSolicitud {
  private ruta = inject(ActivatedRoute);
  private usuario = usuarioActual();

  // El código viene en la URL: /tecnico/solicitudes/SOL-0146
  codigo = this.ruta.snapshot.paramMap.get('codigo') ?? '';

  nombreCliente = nombreCliente;
  nombreTecnico = nombreTecnico;
  claseEstado = claseEstado;
  clasePrioridad = clasePrioridad;

  // Formularios
  nuevoEstado: 'En atención' | 'En espera' = 'En atención';
  motivo = '';
  nuevoAvance = '';
  solucion = '';

  // Mensajes
  mensaje = '';
  errorEstado = '';
  errorAvance = '';
  errorSolucion = '';

  get solicitud(): Solicitud | undefined {
    return solicitudes.find(s => s.codigo === this.codigo);
  }

  get esResponsable(): boolean {
    return !!this.solicitud && this.solicitud.tecnicoId === this.usuario?.tecnicoId;
  }

  tomar(): void {
    const s = this.solicitud;
    if (!s || s.estado !== 'Pendiente') return;
    s.estado = 'En atención';
    s.tecnicoId = this.usuario?.tecnicoId ?? null;
    this.nuevoEstado = 'En atención';
    this.agregarAlHistorial('Solicitud tomada. Estado: En atención.');
    this.mensaje = 'Tomaste la solicitud.';
  }

  actualizarEstado(): void {
    const s = this.solicitud;
    this.errorEstado = '';
    this.mensaje = '';
    if (!s || !this.esResponsable || s.estado === 'Cerrada') return;

    if (this.nuevoEstado === 'En espera' && !this.motivo.trim()) {
      this.errorEstado = 'Indica el motivo por el que pasa a En espera.';
      return;
    }

    s.estado = this.nuevoEstado;
    const texto = this.nuevoEstado === 'En espera'
      ? `Estado cambiado a En espera. Motivo: ${this.motivo.trim()}`
      : 'Estado cambiado a En atención.';
    this.agregarAlHistorial(texto);
    this.motivo = '';
    this.mensaje = 'Estado actualizado.';
  }

  agregarAvance(): void {
    this.errorAvance = '';
    this.mensaje = '';
    if (!this.nuevoAvance.trim()) {
      this.errorAvance = 'Escribe el avance antes de agregarlo.';
      return;
    }
    this.agregarAlHistorial(this.nuevoAvance.trim());
    this.nuevoAvance = '';
    this.mensaje = 'Avance registrado.';
  }

  cerrar(): void {
    const s = this.solicitud;
    this.errorSolucion = '';
    this.mensaje = '';
    if (!s || !this.esResponsable || s.estado === 'Cerrada') return;

    if (!this.solucion.trim()) {
      this.errorSolucion = 'La solución es obligatoria para cerrar la solicitud.';
      return;
    }

    s.estado = 'Cerrada';
    s.solucion = this.solucion.trim();
    s.fechaCierre = fechaHoy();
    this.agregarAlHistorial('Solicitud cerrada.');
    this.solucion = '';
    this.mensaje = `Solicitud cerrada. Tiempo de atención: ${this.tiempoAtencion()}.`;
  }

  tiempoAtencion(): string {
    const s = this.solicitud;
    if (!s) return '';
    const fin = fechaComoNumero(s.fechaCierre ?? fechaHoy());
    const dias = Math.round((fin - fechaComoNumero(s.fecha)) / (1000 * 60 * 60 * 24));
    return dias === 0 ? 'menos de 1 día' : dias === 1 ? '1 día' : `${dias} días`;
  }

  // Agrega una línea al inicio del historial de avances (la más reciente primero)
  private agregarAlHistorial(texto: string): void {
    const s = this.solicitud;
    if (!s) return;
    const avance = { fecha: fechaHoraAhora(), responsable: this.usuario?.nombre ?? 'Sistema', texto };
    s.avances = [avance, ...(s.avances ?? [])];
  }
}
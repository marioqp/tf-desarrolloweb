import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Canal, Prioridad, TipoSolicitud, clientes, fechaHoraAhora, fechaHoy, solicitudes } from '../../../data/datos';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-nueva-solicitud',
  styleUrl: './nueva-solicitud.css',
  templateUrl: './nueva-solicitud.html',
})
export class NuevaSolicitud {
  clientes = clientes;

  tipos: TipoSolicitud[] = ['Incidencia', 'Cambio de configuración', 'Falla del producto', 'Capacitación'];
  productos = ['Firewall', 'Endpoint Security', 'Antivirus corporativo', 'Filtro web', 'Protección de endpoints', 'Otro'];

  // Campos del formulario
  clienteId: number | null = null;
  canal: Canal = 'Chat';
  tipo: TipoSolicitud | '' = '';
  producto = 'Firewall';
  prioridad: Prioridad = 'Media';   // HU07 escenario 2: Media por defecto
  descripcion = '';

  enviado = false;
  codigoCreado = '';

  // HU06: registrar la solicitud
  registrar(): void {
    this.enviado = true;
    this.codigoCreado = '';

    // Escenario 2: campos obligatorios
    if (!this.clienteId || !this.tipo || !this.descripcion.trim()) return;

    // Código único: el número más alto que existe + 1  →  SOL-0148
    const mayor = Math.max(0, ...solicitudes.map(s => Number(s.codigo.replace('SOL-', ''))));
    const codigo = 'SOL-' + String(mayor + 1).padStart(4, '0');

    solicitudes.push({
      codigo,
      clienteId: this.clienteId,
      tipo: this.tipo,
      producto: this.producto,
      canal: this.canal,
      fecha: fechaHoy(),
      estado: 'Pendiente',
      prioridad: this.prioridad,
      tecnicoId: null,
      descripcion: this.descripcion.trim(),
      avances: [{ fecha: fechaHoraAhora(), responsable: 'Sistema', texto: `Solicitud registrada por ${this.canal.toLowerCase()}. Estado: Pendiente.` }]
    });

    this.codigoCreado = codigo;

    // Limpiar el formulario
    this.clienteId = null;
    this.canal = 'Chat';
    this.tipo = '';
    this.producto = 'Firewall';
    this.prioridad = 'Media';
    this.descripcion = '';
    this.enviado = false;
  }
}
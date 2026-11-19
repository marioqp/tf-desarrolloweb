import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Cliente, Solicitud, claseEstado, clientes, fechaComoNumero, nombreTecnico, solicitudes } from '../../../data/datos';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-historial-cliente',
  styleUrl: './historial-cliente.css',
  templateUrl: './historial-cliente.html',
})
export class HistorialCliente {
  private ruta = inject(ActivatedRoute);

  clientes = clientes;
  // El cliente llega en la URL: /tecnico/clientes/historial?cliente=1
  clienteId = Number(this.ruta.snapshot.queryParamMap.get('cliente')) || 0;
  tipoFiltro = '';
  productoFiltro = '';

  nombreTecnico = nombreTecnico;
  claseEstado = claseEstado;

  get clienteSeleccionado(): Cliente | undefined {
    return this.clientes.find(c => c.id === Number(this.clienteId));
  }

  // HU18: solicitudes del cliente, de la más reciente a la más antigua
  get historial(): Solicitud[] {
    return solicitudes
      .filter(s => s.clienteId === Number(this.clienteId)
        && s.tipo.toLowerCase().includes(this.tipoFiltro.toLowerCase())
        && s.producto.toLowerCase().includes(this.productoFiltro.toLowerCase()))
      .sort((a, b) => fechaComoNumero(b.fecha) - fechaComoNumero(a.fecha));
  }
}

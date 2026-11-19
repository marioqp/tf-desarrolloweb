import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Cliente, clientes, solicitudes } from '../../../data/datos';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-lista-clientes',
  styleUrl: './lista-clientes.css',
  templateUrl: './lista-clientes.html',
})
export class ListaClientes {
  clientes = clientes;

  busqueda = '';
  mostrarFormulario = false;
  error = '';
  nuevo = { razonSocial: '', ruc: '', contacto: '', correo: '', telefono: '' };

  // HU05: buscar por razón social o RUC
  get clientesFiltrados(): Cliente[] {
    const q = this.busqueda.trim().toLowerCase();
    return this.clientes.filter(c => c.razonSocial.toLowerCase().includes(q) || c.ruc.includes(q));
  }

  cantidadSolicitudes(clienteId: number): number {
    return solicitudes.filter(s => s.clienteId === clienteId).length;
  }

  // HU03: registrar cliente
  agregarCliente(): void {
    if (!this.nuevo.razonSocial.trim() || !/^\d{11}$/.test(this.nuevo.ruc) || !this.nuevo.contacto.trim() || !this.nuevo.correo.includes('@')) {
      this.error = 'Completa los campos y verifica que el RUC tenga 11 dígitos.';
      return;
    }
    if (this.clientes.some(c => c.ruc === this.nuevo.ruc)) {
      this.error = 'Ya existe un cliente con ese RUC.';
      return;
    }
    // push agrega a la lista compartida de datos.ts, así el cliente aparece en las demás pantallas
    this.clientes.push({ ...this.nuevo, id: Math.max(0, ...this.clientes.map(c => c.id)) + 1 });
    this.nuevo = { razonSocial: '', ruc: '', contacto: '', correo: '', telefono: '' };
    this.error = '';
    this.mostrarFormulario = false;
  }
}

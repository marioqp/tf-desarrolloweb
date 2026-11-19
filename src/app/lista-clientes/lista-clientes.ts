import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Cliente } from '../../shared/models/cliente.model';
import { CLIENTES } from '../../shared/models/mock-data';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Navbar } from '../../shared/components/navbar/navbar';
@Component({ selector: 'app-lista-clientes', standalone: true, imports: [Sidebar, Navbar, FormsModule, RouterLink], templateUrl: './lista-clientes.html', styleUrl: './lista-clientes.css' })
export class ListaClientes {
  clientes: Cliente[] = [...CLIENTES];
  busqueda = ''; mostrarFormulario = false; error = '';
  nuevo = { razonSocial: '', ruc: '', contacto: '', correo: '', telefono: '' };
  get clientesFiltrados(): Cliente[] { const q=this.busqueda.trim().toLowerCase(); return this.clientes.filter(c=>c.razonSocial.toLowerCase().includes(q)||c.ruc.includes(q)); }
  agregarCliente(): void { if(!this.nuevo.razonSocial.trim()||!/^\d{11}$/.test(this.nuevo.ruc)||!this.nuevo.contacto.trim()||!this.nuevo.correo.includes('@')) { this.error='Completa los campos y verifica que el RUC tenga 11 dígitos.'; return; } if(this.clientes.some(c=>c.ruc===this.nuevo.ruc)){this.error='Ya existe un cliente con ese RUC.';return;} this.clientes=[...this.clientes,{...this.nuevo,id:Math.max(0,...this.clientes.map(c=>c.id))+1,solicitudes:0}]; this.nuevo={razonSocial:'',ruc:'',contacto:'',correo:'',telefono:''};this.error='';this.mostrarFormulario=false; }

}

import { Component } from '@angular/core';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
    imports: [RouterLink,Sidebar,Navbar],
    selector: 'app-solicitudes-pendientes',
    styleUrl: './solicitudes-pendientes.css',
    templateUrl: './solicitudes-pendientes.html',
})

export class SolicitudesPendientes {

    mensaje = '';

  // Ya están en orden: primero prioridad alta y, dentro de cada una, la más antigua primero
    pendientes = [
    { codigo: 'SOL-0147', cliente: 'Clínica San Gabriel', tipo: 'Falla del producto', canal: 'Correo', prioridad: 'Alta', registrada: 'Hoy, 08:42' },
    { codigo: 'SOL-0148', cliente: 'Constructora Andina SAC', tipo: 'Incidencia', canal: 'Chat', prioridad: 'Alta', registrada: 'Hoy, 09:15' },
    { codigo: 'SOL-0144', cliente: 'Colegio Los Pinos', tipo: 'Cambio de configuración', canal: 'Chat', prioridad: 'Media', registrada: 'Ayer, 16:20' },
    { codigo: 'SOL-0145', cliente: 'Distribuidora Norte SAC', tipo: 'Incidencia', canal: 'Correo', prioridad: 'Media', registrada: 'Ayer, 17:05' },
    { codigo: 'SOL-0143', cliente: 'Financiera Pacífico Sur', tipo: 'Capacitación', canal: 'Correo', prioridad: 'Baja', registrada: '10/11, 11:30' },
    ];

    cantidadAltas() {
    let cantidad = 0;
    for (let s of this.pendientes) {
        if (s.prioridad == 'Alta') {
        cantidad++;
        }
    }
    return cantidad;
    }

    tomar(codigo: string) {
    if (confirm('¿Tomar la solicitud ' + codigo + '?')) {
        for (let i = 0; i < this.pendientes.length; i++) {
        if (this.pendientes[i].codigo == codigo) {
          this.pendientes.splice(i, 1); // quita esa solicitud de la lista
        }
        }
        this.mensaje = 'Tomaste la solicitud ' + codigo;
    }
    }
}


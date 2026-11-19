import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { Navbar } from '../../shared/navbar/navbar';

@Component({
    selector: 'app-solicitudes',
    imports: [FormsModule, RouterLink, Sidebar, Navbar, FormsModule],
    templateUrl: './solicitudes.html',
    styleUrl: './solicitudes.css',
})
    export class Solicitudes {
    tecnicoActual = 'Luis Ramos';

    busqueda = '';
    estado = '';
    tipo = '';
    prioridad = '';
    soloMias = false;

    solicitudes = [
    { codigo: 'SOL-0146', cliente: 'Constructora Andina SAC', tipo: 'Incidencia', estado: 'En atención', prioridad: 'Alta', tecnico: 'Luis Ramos' },
    { codigo: 'SOL-0141', cliente: 'Clínica San Gabriel', tipo: 'Cambio de configuración', estado: 'En espera', prioridad: 'Media', tecnico: 'Luis Ramos' },
    { codigo: 'SOL-0140', cliente: 'Colegio Los Pinos', tipo: 'Falla del producto', estado: 'En atención', prioridad: 'Alta', tecnico: 'Ana Torres' },
    { codigo: 'SOL-0138', cliente: 'Distribuidora Norte SAC', tipo: 'Incidencia', estado: 'Cerrada', prioridad: 'Media', tecnico: 'Jorge Salas' },
    { codigo: 'SOL-0137', cliente: 'Constructora Andina SAC', tipo: 'Capacitación', estado: 'Cerrada', prioridad: 'Baja', tecnico: 'Luis Ramos' },
    { codigo: 'SOL-0147', cliente: 'Clínica San Gabriel', tipo: 'Falla del producto', estado: 'Pendiente', prioridad: 'Alta', tecnico: 'Sin asignar' },
    ];

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
        if (this.soloMias && s.tecnico != this.tecnicoActual) {
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
        if (s.tecnico == this.tecnicoActual && (s.estado == 'En atención' || s.estado == 'En espera')) {
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
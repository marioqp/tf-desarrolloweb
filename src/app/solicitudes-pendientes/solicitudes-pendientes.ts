import { Component } from '@angular/core';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Navbar } from '../../shared/components/navbar/navbar';
@Component({ selector: 'app-solicitudes-pendientes', standalone: true, imports: [Sidebar, Navbar], templateUrl: './solicitudes-pendientes.html', styleUrl: './solicitudes-pendientes.css' })
export class SolicitudesPendientes {

}

import { Component } from '@angular/core';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Navbar } from '../../shared/components/navbar/navbar';
@Component({ selector: 'app-nueva-solicitud', standalone: true, imports: [Sidebar, Navbar], templateUrl: './nueva-solicitud.html', styleUrl: './nueva-solicitud.css' })
export class NuevaSolicitud {

}

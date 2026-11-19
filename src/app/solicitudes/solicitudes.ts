import { Component } from '@angular/core';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Navbar } from '../../shared/components/navbar/navbar';
@Component({ selector: 'app-solicitudes', standalone: true, imports: [Sidebar, Navbar], templateUrl: './solicitudes.html', styleUrl: './solicitudes.css' })
export class Solicitudes {

}

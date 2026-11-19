import { Component } from '@angular/core';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Navbar } from '../../shared/components/navbar/navbar';
@Component({ selector: 'app-portal-cliente', standalone: true, imports: [Sidebar, Navbar], templateUrl: './portal-cliente.html', styleUrl: './portal-cliente.css' })
export class PortalCliente {

}

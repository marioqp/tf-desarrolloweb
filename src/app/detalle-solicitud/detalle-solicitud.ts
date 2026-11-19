import { Component } from '@angular/core';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({ 
    selector: 'app-detalle-solicitud', 
    standalone: true, 
    imports: [Sidebar, Navbar], 
    templateUrl: './detalle-solicitud.html', 
    styleUrl: './detalle-solicitud.css' 

})

    export class DetalleSolicitud {

}

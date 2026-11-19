import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Cliente } from '../../shared/models/cliente.model';
import { Solicitud } from '../../shared/models/solicitud.model';
import { CLIENTES, SOLICITUDES } from '../../shared/models/mock-data';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({ 

  selector: 'app-historial-cliente', 
  standalone: true, 
  imports: [Sidebar, Navbar, FormsModule, RouterLink], 
  templateUrl: './historial-cliente.html', 
  styleUrl: './historial-cliente.css' 

})

export class HistorialCliente {

  clientes: Cliente[] = CLIENTES; 
  solicitudes: Solicitud[] = SOLICITUDES; 
  clienteId = 0; 
  tipoFiltro=''; 
  productoFiltro='';

  constructor(route: ActivatedRoute){ 

    const id=Number(route.snapshot.queryParamMap.get('cliente')); 
    if(id) this.clienteId=id; 
  }

  get clienteSeleccionado(): Cliente | undefined { 

    return this.clientes.find(c=>c.id===Number(this.clienteId)); 

  }
  
  get historial(): Solicitud[] { 
    return this.solicitudes.filter(s=>s.clienteId===Number(this.clienteId)&&s.tipo.toLowerCase().includes(this.tipoFiltro.toLowerCase())&&s.producto.toLowerCase().includes(this.productoFiltro.toLowerCase())).sort((a,b)=>this.fechaOrden(b.fecha)-this.fechaOrden(a.fecha)); 
  
  }

  private fechaOrden(fecha: string): number { 
    
    const [dia, mes, anio] = fecha.split('/').map(Number); 

    return new Date(anio, mes - 1, dia).getTime(); 
  
  }

}

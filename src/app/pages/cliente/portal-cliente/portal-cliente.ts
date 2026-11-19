import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estado, Solicitud, claseEstado, nombreCliente, nombreTecnico, solicitudes, usuarioActual } from '../../../data/datos';

@Component({
  selector: 'app-portal-cliente',
  imports: [],
  templateUrl: './portal-cliente.html',
  styleUrl: './portal-cliente.css'
})
export class PortalCliente {
  private router = inject(Router);
  private ruta = inject(ActivatedRoute);

  usuario = usuarioActual();
  empresa = this.usuario?.clienteId ? nombreCliente(this.usuario.clienteId) : '';

  nombreTecnico = nombreTecnico;
  claseEstado = claseEstado;
  pasos: Estado[] = ['Pendiente', 'En atención', 'En espera', 'Cerrada'];
  codigoSeleccionado = '';
  accesoDenegado = false;

  constructor() {
    this.ruta.queryParamMap.subscribe(parametros => {
      const codigo = parametros.get('codigo');
      if (codigo) {
        this.verSolicitud(codigo, false);
      } else {
        this.codigoSeleccionado = '';
        this.accesoDenegado = false;
      }
    });
  }

  get solicitudesCliente(): Solicitud[] {
    // HU16: solo las solicitudes de la organización del cliente que inició sesión
    if (this.usuario?.rol !== 'cliente' || !this.usuario.clienteId) return [];
    return solicitudes.filter(s => s.clienteId === this.usuario?.clienteId);
  }

  get solicitudActual(): Solicitud | undefined {
    if (this.accesoDenegado) return undefined;
    return this.solicitudesCliente.find(s => s.codigo === this.codigoSeleccionado)
      ?? this.solicitudesCliente[0];
  }

  verSolicitud(codigo: string, actualizarRuta = true): void {
    const pertenece = this.solicitudesCliente.some(s => s.codigo === codigo);
    this.codigoSeleccionado = pertenece ? codigo : '';
    this.accesoDenegado = !pertenece;

    if (actualizarRuta) {
      this.router.navigate([], {
        relativeTo: this.ruta,
        queryParams: { codigo },
        queryParamsHandling: 'merge'
      });
    }
  }

  pasoCompletado(estado: Estado, paso: string): boolean {
    if (estado === 'Cerrada') return true;
    if (estado === 'Pendiente') return paso === 'Pendiente';
    if (estado === 'En atención') return paso === 'Pendiente' || paso === 'En atención';
    return paso === 'Pendiente' || paso === 'En atención' || paso === 'En espera';
  }

  cerrarSesion(): void {
    sessionStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}

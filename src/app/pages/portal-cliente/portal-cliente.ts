import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Solicitud, EstadoSolicitud } from '../../shared/models/solicitud.model';
import { CLIENTES, SOLICITUDES } from '../../shared/models/mock-data';
import { StatusBadge } from '../../shared/components/status-badge/status-badge';

@Component({
  selector: 'app-portal-cliente',
  standalone: true,
  imports: [StatusBadge],
  templateUrl: './portal-cliente.html',
  styleUrl: './portal-cliente.css'
})
export class PortalCliente {
  private auth = inject(AuthService);
  private router = inject(Router);
  private ruta = inject(ActivatedRoute);

  usuario = this.auth.obtenerUsuario();
  empresa = this.usuario?.organizacion ?? '';
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
    if (this.usuario?.rol !== 'cliente' || !this.empresa) return [];

    const empresa = this.empresa.trim().toLowerCase();
    const cliente = CLIENTES.find(c => c.razonSocial.toLowerCase().startsWith(empresa));
    if (!cliente) return [];

    return SOLICITUDES.filter(s => s.clienteId === cliente.id);
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

  pasoCompletado(estado: EstadoSolicitud, paso: string): boolean {
    if (estado === 'Cerrada') return true;
    if (estado === 'Pendiente') return paso === 'Pendiente';
    if (estado === 'En atención') return paso === 'Pendiente' || paso === 'En atención';
    return paso === 'Pendiente' || paso === 'En atención' || paso === 'En espera';
  }

  cerrarSesion(): void {
    this.auth.cerrarSesion();
    this.router.navigate(['/login']);
  }
}

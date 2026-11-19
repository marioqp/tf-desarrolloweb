import { Routes } from '@angular/router';
import { Login } from './pages/login/login';

import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { PanelResumen } from './pages/admin/panel-resumen/panel-resumen';
import { RegistrarTecnico } from './pages/admin/registrar-tecnico/registrar-tecnico';

import { TecnicoLayout } from './layouts/tecnico-layout/tecnico-layout';
import { SolicitudesPendientes } from './pages/tecnico/solicitudes-pendientes/solicitudes-pendientes';
import { Solicitudes } from './pages/tecnico/solicitudes/solicitudes';
import { DetalleSolicitud } from './pages/tecnico/detalle-solicitud/detalle-solicitud';
import { NuevaSolicitud } from './pages/tecnico/nueva-solicitud/nueva-solicitud';
import { ListaClientes } from './pages/tecnico/lista-clientes/lista-clientes';
import { HistorialCliente } from './pages/tecnico/historial-cliente/historial-cliente';

import { PortalCliente } from './pages/cliente/portal-cliente/portal-cliente';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },

  // Administrador (Integrante 1)
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: '', redirectTo: 'panel', pathMatch: 'full' },
      { path: 'panel', component: PanelResumen },
      { path: 'tecnicos', component: RegistrarTecnico }
    ]
  },

  // Técnico
  {
    path: 'tecnico',
    component: TecnicoLayout,
    children: [
      { path: '', redirectTo: 'pendientes', pathMatch: 'full' },
      { path: 'pendientes', component: SolicitudesPendientes },
      { path: 'solicitudes', component: Solicitudes },
      { path: 'solicitudes/:codigo', component: DetalleSolicitud },
      { path: 'nueva-solicitud', component: NuevaSolicitud },
      { path: 'clientes', component: ListaClientes },
      { path: 'clientes/historial', component: HistorialCliente }
    ]
  },

  // Cliente
  { path: 'cliente', component: PortalCliente },

  // Cualquier ruta que no exista vuelve al login
  { path: '**', redirectTo: 'login' }
];

import { Routes } from '@angular/router';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { PanelResumen } from './pages/admin/panel-resumen/panel-resumen';
import { RegistrarTecnico } from './pages/admin/registrar-tecnico/registrar-tecnico';
import { Login } from './pages/login/login';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login},
    { path: 'admin',
        component: AdminLayout,
        children: [
            { path: '', redirectTo: 'panel', pathMatch: 'full' },
            { path: 'panel', component: PanelResumen },
            { path: 'tecnicos', component: RegistrarTecnico }
        ]
    }
]

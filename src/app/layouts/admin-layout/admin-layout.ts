import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-admin-layout',
  styleUrl: './admin-layout.css',
  templateUrl: './admin-layout.html',
})
export class AdminLayout {
  private router = inject(Router)

  nombreUsuario = JSON.parse(sessionStorage.getItem('usuario') ?? '{}').nombre ?? 'Administrador';

  cerrarSesion(): void {
    sessionStorage.removeItem('usuario')
    this.router.navigate(['/login'])
  }
}

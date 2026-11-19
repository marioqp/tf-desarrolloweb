import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { usuarioActual } from '../../data/datos';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-tecnico-layout',
  styleUrl: './tecnico-layout.css',
  templateUrl: './tecnico-layout.html',
})
export class TecnicoLayout {
  private router = inject(Router)

  nombreUsuario = usuarioActual()?.nombre ?? 'Técnico';

  cerrarSesion(): void {
    sessionStorage.removeItem('usuario')
    this.router.navigate(['/login'])
  }
}

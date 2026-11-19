import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

// Pantalla pendiente: HU08, HU12, HU14 y HU15 (detalle, estado, avances y cierre)
@Component({
  imports: [RouterLink],
  selector: 'app-detalle-solicitud',
  styleUrl: './detalle-solicitud.css',
  templateUrl: './detalle-solicitud.html',
})
export class DetalleSolicitud {
  private ruta = inject(ActivatedRoute);

  // Código que viene en la URL: /tecnico/solicitudes/SOL-0146
  codigo = this.ruta.snapshot.paramMap.get('codigo') ?? '';
}

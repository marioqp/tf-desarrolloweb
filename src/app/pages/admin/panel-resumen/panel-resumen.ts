import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Estado, Solicitud, solicitudes, tecnicos } from '../../../data/datos';

@Component({
  imports: [FormsModule],
  selector: 'app-panel-resumen',
  styleUrl: './panel-resumen.css',
  templateUrl: './panel-resumen.html',
})
export class PanelResumen {
  tecnicos = tecnicos
  solicitudes = solicitudes

  estados: Estado[] = ['Pendiente', 'En atención', 'En espera', 'Cerrada']

  seleccion: Record<string, number | null> = {};
  mensaje = '';

  contarPorEstado(estado: Estado): number {
    return this.solicitudes.filter(s => s.estado === estado).length;
  }

  nombreTecnico(id: number | null): string {
    const t = this.tecnicos.find(t => t.id === id);
    return t ? `${t.nombre} ${t.apellidos}` : 'Sin asignar';
  }

  solicitudesActivas(): Solicitud[] {
    return this.solicitudes.filter(s => s.estado === 'En atención' || s.estado === 'En espera');
  }

  cargaPorTecnico() {
    return this.tecnicos.map(t => {
      const suyas = this.solicitudesActivas().filter(s => s.tecnicoId === t.id);
      return {
        nombre: `${t.nombre} ${t.apellidos}`,
        activos: suyas.length,
        enEspera: suyas.filter(s => s.estado === 'En espera').length
      };
    });
  }

  claseEstado(estado: Estado): string {
    const clases: Record<Estado, string> = {
      'Pendiente': 'chip-pendiente',
      'En atención': 'chip-atencion',
      'En espera': 'chip-espera',
      'Cerrada': 'chip-cerrada'
    };
    return clases[estado];
  }

  reasignar(solicitud: Solicitud): void {
    const nuevoId = this.seleccion[solicitud.codigo];
    if (!nuevoId) return;

    solicitud.tecnicoId = nuevoId;
    this.mensaje = `${solicitud.codigo} fue reasignada a ${this.nombreTecnico(nuevoId)}.`;
    this.seleccion[solicitud.codigo] = null;
  }
}

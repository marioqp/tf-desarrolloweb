export type EstadoSolicitud = 'Pendiente' | 'En atención' | 'En espera' | 'Cerrada';
export type Prioridad = 'Alta' | 'Media' | 'Baja';

export interface AvanceSolicitud {
  fecha: string;
  responsable: string;
  texto: string;
}

export interface Solicitud {
  codigo: string;
  clienteId: number;
  cliente: string;
  tipo: string;
  producto: string;
  fecha: string;
  estado: EstadoSolicitud;
  prioridad: Prioridad;
  tecnico: string;
  descripcion: string;
  solucion?: string;
  avances?: AvanceSolicitud[];
}

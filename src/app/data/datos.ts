// =====================================================================
// Datos de prueba de TODA la aplicación (TB1).
// Todas las pantallas leen y modifican estas mismas listas, así que un
// cambio hecho en una pantalla (ej. tomar o reasignar una solicitud)
// se ve en las demás. En el TB2 estos datos vendrán del backend.
// =====================================================================

// ---------- Tipos ----------
export type Estado = 'Pendiente' | 'En atención' | 'En espera' | 'Cerrada';
export type Prioridad = 'Alta' | 'Media' | 'Baja';
export type TipoSolicitud = 'Incidencia' | 'Cambio de configuración' | 'Falla del producto' | 'Capacitación';
export type Canal = 'Chat' | 'Correo';

export interface Tecnico {
  id: number;
  nombre: string;
  apellidos: string;
  correo: string;
  clave: string;
}

export interface Cliente {
  id: number;
  razonSocial: string;
  ruc: string;
  contacto: string;
  correo: string;
  telefono: string;
}

export interface Avance {
  fecha: string;
  responsable: string;
  texto: string;
}

export interface Solicitud {
  codigo: string;
  clienteId: number;
  tipo: TipoSolicitud;
  producto: string;
  canal: Canal;
  fecha: string;              // dd/mm/aaaa
  estado: Estado;
  prioridad: Prioridad;
  tecnicoId: number | null;   // null = todavía nadie la tomó
  descripcion: string;
  solucion?: string;
  avances?: Avance[];
}

// Usuario que inició sesión (lo guarda el login en sessionStorage)
export interface UsuarioSesion {
  rol: 'tecnico' | 'admin' | 'cliente';
  nombre: string;
  tecnicoId?: number;
  clienteId?: number;
}

// ---------- Datos de prueba ----------
export const tecnicos: Tecnico[] = [
  { id: 1, nombre: 'Luis',   apellidos: 'Ramos',   correo: 'lramos@exxoda.pe',   clave: '123456' },
  { id: 2, nombre: 'Ana',    apellidos: 'Torres',  correo: 'atorres@exxoda.pe',  clave: '123456' },
  { id: 3, nombre: 'Jorge',  apellidos: 'Salas',   correo: 'jsalas@exxoda.pe',   clave: '123456' },
  { id: 4, nombre: 'Diana',  apellidos: 'Flores',  correo: 'dflores@exxoda.pe',  clave: '123456' },
  { id: 5, nombre: 'Miguel', apellidos: 'Paredes', correo: 'mparedes@exxoda.pe', clave: '123456' }
];

export const clientes: Cliente[] = [
  { id: 1, razonSocial: 'ManpowerGroup Perú S.A.', ruc: '20100032216', contacto: 'Victor Aguirre', correo: 'v.aguirre@manpower.pe', telefono: '(01) 615-5500' },
  { id: 2, razonSocial: 'Corporación Andina de Tecnología S.A.C.', ruc: '20548796321', contacto: 'María Fernanda Rojas', correo: 'mrojas@cat.com.pe', telefono: '987 654 321' },
  { id: 3, razonSocial: 'Servicios Integrales del Pacífico S.R.L.', ruc: '20601234567', contacto: 'Carlos Mendoza', correo: 'cmendoza@sip.pe', telefono: '946 321 875' },
  { id: 4, razonSocial: 'Comercializadora del Sur S.A.', ruc: '20456789123', contacto: 'Lucía Torres', correo: 'ltorres@cds.pe', telefono: '(054) 221-456' },
  { id: 5, razonSocial: 'Inversiones Nova Perú E.I.R.L.', ruc: '20607894512', contacto: 'José Ramírez', correo: 'jramirez@nova.pe', telefono: '955 123 456' },
  { id: 6, razonSocial: 'Rimac Seguros', ruc: '00000000000', contacto: 'Contacto de prueba', correo: 'cliente@ejemplo.invalid', telefono: 'Sin registrar' }
];

export const solicitudes: Solicitud[] = [
  {
    codigo: 'SOL-0147', clienteId: 4, tipo: 'Incidencia', producto: 'Firewall', canal: 'Correo',
    fecha: '18/11/2026', estado: 'Pendiente', prioridad: 'Alta', tecnicoId: null,
    descripcion: 'No se puede acceder al portal de administración.'
  },
  {
    codigo: 'SOL-0146', clienteId: 1, tipo: 'Falla del producto', producto: 'Endpoint Security', canal: 'Chat',
    fecha: '18/11/2026', estado: 'En atención', prioridad: 'Alta', tecnicoId: 1,
    descripcion: 'El agente de protección no actualiza las firmas en varios equipos.',
    avances: [
      { fecha: '18/11/2026, 11:10', responsable: 'Luis Ramos', texto: 'Se revisaron las actualizaciones de las firmas de protección.' },
      { fecha: '18/11/2026, 09:20', responsable: 'Luis Ramos', texto: 'Se inició el diagnóstico en los equipos reportados.' }
    ]
  },
  {
    codigo: 'SOL-0145', clienteId: 5, tipo: 'Cambio de configuración', producto: 'Filtro web', canal: 'Chat',
    fecha: '17/11/2026', estado: 'Pendiente', prioridad: 'Media', tecnicoId: null,
    descripcion: 'Se pide permitir el acceso a un portal de proveedores bloqueado por el filtro web.'
  },
  {
    codigo: 'SOL-0141', clienteId: 2, tipo: 'Incidencia', producto: 'Antivirus corporativo', canal: 'Correo',
    fecha: '09/11/2026', estado: 'En espera', prioridad: 'Alta', tecnicoId: 1,
    descripcion: 'Se requiere acceso remoto para continuar el diagnóstico.'
  },
  {
    codigo: 'SOL-0140', clienteId: 6, tipo: 'Incidencia', producto: 'Firewall', canal: 'Correo',
    fecha: '14/11/2026', estado: 'En atención', prioridad: 'Alta', tecnicoId: 2,
    descripcion: 'No se puede ingresar al portal de trabajo porque aparece bloqueado por el firewall.',
    avances: [
      { fecha: '14/11/2026, 10:05', responsable: 'Ana Torres', texto: 'Se revisaron los registros del firewall y la regla que bloquea la página.' },
      { fecha: '14/11/2026, 09:40', responsable: 'Ana Torres', texto: 'Se solicitó acceso remoto al cliente para continuar la revisión.' },
      { fecha: '14/11/2026, 09:15', responsable: 'Sistema', texto: 'Se registró la solicitud recibida por correo.' }
    ]
  },
  {
    codigo: 'SOL-0139', clienteId: 3, tipo: 'Capacitación', producto: 'Endpoint Security', canal: 'Correo',
    fecha: '13/11/2026', estado: 'En atención', prioridad: 'Baja', tecnicoId: 3,
    descripcion: 'Capacitación de usuarios en la consola de protección.'
  },
  {
    codigo: 'SOL-0138', clienteId: 1, tipo: 'Cambio de configuración', producto: 'Firewall', canal: 'Chat',
    fecha: '12/11/2026', estado: 'Cerrada', prioridad: 'Media', tecnicoId: 3,
    descripcion: 'Ajuste de reglas de acceso remoto.',
    solucion: 'Se actualizaron las reglas y se validó la conexión.',
    avances: [
      { fecha: '12/11/2026, 16:00', responsable: 'Jorge Salas', texto: 'Se comprobaron las reglas y se validó el acceso remoto.' }
    ]
  },
  {
    codigo: 'SOL-0137', clienteId: 6, tipo: 'Capacitación', producto: 'Protección de endpoints', canal: 'Correo',
    fecha: '28/10/2026', estado: 'Cerrada', prioridad: 'Media', tecnicoId: 2,
    descripcion: 'Capacitación para el personal sobre el uso de la consola de protección de equipos.',
    solucion: 'Se realizó la capacitación y se atendieron las consultas de los participantes.',
    avances: [
      { fecha: '28/10/2026, 16:30', responsable: 'Ana Torres', texto: 'Terminó la capacitación y se cerró la solicitud.' },
      { fecha: '28/10/2026, 10:00', responsable: 'Ana Torres', texto: 'Se inició la capacitación con el personal del cliente.' }
    ]
  },
  {
    codigo: 'SOL-0136', clienteId: 3, tipo: 'Falla del producto', producto: 'Firewall', canal: 'Chat',
    fecha: '02/11/2026', estado: 'En espera', prioridad: 'Media', tecnicoId: 4,
    descripcion: 'El firewall se reinicia solo durante la noche.'
  }
];

// ---------- Funciones de ayuda (las usan varias pantallas) ----------
export function nombreTecnico(id: number | null): string {
  const t = tecnicos.find(t => t.id === id);
  return t ? `${t.nombre} ${t.apellidos}` : 'Sin asignar';
}

export function nombreCliente(id: number): string {
  return clientes.find(c => c.id === id)?.razonSocial ?? 'Cliente desconocido';
}

export function claseEstado(estado: Estado): string {
  const clases: Record<Estado, string> = {
    'Pendiente': 'chip-pendiente',
    'En atención': 'chip-atencion',
    'En espera': 'chip-espera',
    'Cerrada': 'chip-cerrada'
  };
  return clases[estado];
}

export function clasePrioridad(prioridad: Prioridad): string {
  const clases: Record<Prioridad, string> = {
    'Alta': 'chip-alta',
    'Media': 'chip-media',
    'Baja': 'chip-baja'
  };
  return clases[prioridad];
}

// Convierte 'dd/mm/aaaa' en un número para poder ordenar por fecha
export function fechaComoNumero(fecha: string): number {
  const [dia, mes, anio] = fecha.split('/').map(Number);
  return new Date(anio, mes - 1, dia).getTime();
}

export function usuarioActual(): UsuarioSesion | null {
  return JSON.parse(sessionStorage.getItem('usuario') ?? 'null');
}

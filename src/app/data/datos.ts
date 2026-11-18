// ---------- Tipos ----------
export type Estado = 'Pendiente' | 'En atención' | 'En espera' | 'Cerrada';
export type Prioridad = 'Alta' | 'Media' | 'Baja';

export interface Tecnico {
    id: number;
    nombre: string;
    apellidos: string;
    correo: string;
    clave: string;
}

export interface Solicitud {
    codigo: string;
    cliente: string;
    estado: Estado;
    prioridad: Prioridad;
    tecnicoId: number | null;  // null = todavía nadie la tomó
}

// ---------- Datos de prueba ----------
export const tecnicos: Tecnico[] = [
    { id: 1, nombre: 'Luis',   apellidos: 'Ramos',     correo: 'lramos@exxoda.pe',   clave: '123456' },
    { id: 2, nombre: 'Ana',    apellidos: 'Torres',   correo: 'atorres@exxoda.pe', clave: '123456' },
    { id: 3, nombre: 'Jorge', apellidos: 'Salas',     correo: 'jsalas@exxoda.pe',   clave: '123456' },
    { id: 4, nombre: 'Diana', apellidos: 'Flores',   correo: 'dflores@exxoda.pe', clave: '123456' },
    { id: 5, nombre: 'Miguel', apellidos: 'Paredes', correo: 'mparedes@exxoda.pe', clave: '123456' }
];

export const solicitudes: Solicitud[] = [
    { codigo: 'SOL-0147', cliente: 'Clínica San Gabriel',     estado: 'Pendiente',     prioridad: 'Alta',   tecnicoId: null },
    { codigo: 'SOL-0146', cliente: 'Constructora Andina SAC', estado: 'En atención', prioridad: 'Alta',   tecnicoId: 1 },
    { codigo: 'SOL-0145', cliente: 'Distribuidora Norte SAC', estado: 'Pendiente',     prioridad: 'Media', tecnicoId: null },
    { codigo: 'SOL-0141', cliente: 'Clínica San Gabriel',     estado: 'En espera',     prioridad: 'Media', tecnicoId: 1 },
    { codigo: 'SOL-0140', cliente: 'Colegio Los Pinos',        estado: 'En atención', prioridad: 'Alta',   tecnicoId: 2 },
    { codigo: 'SOL-0139', cliente: 'Financiera Pacífico Sur', estado: 'En atención', prioridad: 'Baja',   tecnicoId: 3 },
    { codigo: 'SOL-0138', cliente: 'Distribuidora Norte SAC', estado: 'Cerrada',       prioridad: 'Media', tecnicoId: 3 },
    { codigo: 'SOL-0137', cliente: 'Constructora Andina SAC', estado: 'Cerrada',       prioridad: 'Baja',   tecnicoId: 1 },
    { codigo: 'SOL-0136', cliente: 'Colegio Los Pinos',        estado: 'En espera',     prioridad: 'Media', tecnicoId: 4 }
];
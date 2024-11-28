export interface GetRegisterDTO {
    id_registro: number; // ID del registro
    datetime_ingreso: string; // Fecha y hora de ingreso
    datetime_egreso: string | null; // Fecha y hora de egreso (puede ser null)
    n_documento: string; // Número de documento
    apellido_nombre: string; // Apellido y nombre de la persona
    lugares_ocupados: string; // Lugar
}

///dto para los registros historicos
export interface RegisterHistoricalDTO {
    apellido_nombre: string;
    datetime_egreso: string | null;
    datetime_ingreso: string;
    id_registro: number;
    lugares_ocupados: string | null;
    n_documento: string;
}


// Define the DTO for the "Prenda"
interface Garment {
    id_prenda: number;
    prenda: string;
    tipo: string;
    numero: number;
    datetime_ingreso: string;
    datetime_egreso: string | null; // Can be null
    detalle: string | null; // Can be null
    estado_prenda: string;
}

// Define the DTO for the main object
export interface RegisterMovement {
    id_registro: number;
    apellido: string;
    nombre: string;
    n_documento: string;
    datetime_ingreso: string;
    prendas: Garment[]; // Array of Prenda objects
}
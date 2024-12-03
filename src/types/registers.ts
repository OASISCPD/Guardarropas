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
//interface de los registros de objetos perdidos
export interface RegisterObjectLostDTO {
    color: string; // El color de los anteojos, en este caso "BLANCO"
    detalle: string; // Detalle de los anteojos, en este caso "anteojos sin marcos de aumento con patitas de fierrito y mitad goma"
    estado: string; // El estado de los objetos, en este caso "ACTIVO"
    fecha_hora_encuentro: string; // Fecha y hora del encuentro en formato ISO 8601
    id_objeto_perdido: number; // ID único del objeto perdido
    lugar_de_encuentro: string; // El lugar donde se encontró el objeto, en este caso "SALA 3"
    marca: string; // Marca de los anteojos, en este caso "OTRO"
    persona_que_encontro: string; // Persona que encontró el objeto, en este caso "limpieza"
    sector: string; // El sector donde se encontró el objeto, en este caso "ATC"
    tipo_objeto: string; // Tipo de objeto, en este caso "ANTEOJOS"
}
//interface para los registros de los objetos olvidados
export interface RegisterObjectForgottenDTO {
    celular: string
    cliente: string
    datetime_olvidado: string
    estado_registro: string
    id_registro_olvidado: number
    n_documento: string
    usuario: string
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

//registro olvidado por id_registro DTO
export interface GetRegisterByIdRegisterDTO {
    apellido: string
    datetime_olvidado: string
    id_registro_olvidado: number
    n_documento: string
    nombre: string
    prendas: GetGarmentByIdRegisterDTO[]//importamos el dto de prendas olvidadas
}

//dto de prendas olvidadas relacionada a la interrface superior
export interface GetGarmentByIdRegisterDTO {
    datetime_egreso_guardaropas: string
    datetime_ingreso_guardaropas: string
    detalle: string | null
    estado_prenda: string
    id_prenda_olvidada: number
    numero: number
    prenda: string
    tipo: string
}
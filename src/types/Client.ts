export type ClientSelectDTO = {
    client: string
    dni: number | string
    phone: string | number
}


export interface sendDataClient {
    dni: string;
    lastName: string;
    name: string;
    gender: string;
    date: string;
}


export interface ScanerDTO {
    n_documento: string | number
    nombre: string
    apellido: string
    fecha_nacimiento: string
    genero: string
}

export interface GetClientDTO {
    id_cliente: number;
    id_usuario: number;
    nombre: string;
    apellido: string;
    tipo_documento: string;
    n_documento: string;
    genero: string;
    date_nacimiento: string; // Se puede mantener como string o convertirlo a Date si prefieres manipular las fechas de manera más específica
    celular: string;
    direccion: string;
    localidad: string;
    provincia: string;
    estado: string; // Puede ser un valor como 'A' para activo
    fecha_creacion: string; // Fecha en formato string o Date si prefieres un tipo Date
    fecha_actualizacion: string; // Igual que `fecha_creacion`
}

//DTO PARA EL ENVIO DE LA DATA EN MI UPDATE CLIENT
export interface ClientDataUpdateDTO {
    id_cliente: number;
    n_documento: string;
    tipo_documento: string;
    nombre: string;
    apellido: string;
    celular: string;
    fecha_nacimiento: string;
    genero: string;
    provincia: string;
    localidad: string;
    direccion: string;
}



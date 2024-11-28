import { BaseUrl } from "./api";

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
export async function getClientsByDni(dni: number | string) {
    try {
        /* const response = await fetch(`${BaseUrl}/traer_cliente_x_dni?dni=${dni}`, { credentials: 'include' as RequestCredentials }) */
        const response = await fetch(`${BaseUrl}/traer_cliente_x_dni?dni=${dni}`, { credentials: 'include' as RequestCredentials })
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

//function que me trae los registros de los clientes agregados
export async function getClientRegister() {
    try {
        /* const response = await fetch(`${BaseUrl}/traer_cliente_x_dni?dni=${dni}`, { credentials: 'include' as RequestCredentials }) */
        const response = await fetch(`${BaseUrl}/traer_clientes`, { credentials: 'include' as RequestCredentials })
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}
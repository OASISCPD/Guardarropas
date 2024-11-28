import { GiEarrings } from "react-icons/gi";
import { RegisterHistoricalDTO, RegisterMovement } from "../types/registers";
import { BaseUrl } from "./api";


//funcion que me trae todos los registros historicos
export async function getRegisterHistorical(): Promise<RegisterHistoricalDTO[] | null> {
    try {
        const response = await fetch(`${BaseUrl}/traer_historico_registros`, { credentials: 'include' as RequestCredentials })
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
        return null
    }
}

//funcion que me trae los registros por dni
export async function getRegisterByDniHistorical(dni: number | string): Promise<RegisterHistoricalDTO[] | null> {
    try {
        /* traer_registro_historicos_x_dni?dni= */
        const response = await fetch(`${BaseUrl}/traer_registro_historicos_x_dni?dni=${dni}`, { credentials: 'include' as RequestCredentials })
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
        return null
    }
}

//funcion que me trae el registro en particular por id_registro 
export async function getRegisterById(id_registro: number): Promise<RegisterMovement | null> {
    try {
        const response = await fetch(`${BaseUrl}/traer_registro_x_id?id_registro=${id_registro}`, { credentials: 'include' as RequestCredentials })
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error)
        return null
    }
}



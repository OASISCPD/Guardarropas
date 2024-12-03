import { GiEarrings } from "react-icons/gi";
import { GetRegisterByIdRegisterDTO, GetRegisterDTO, RegisterHistoricalDTO, RegisterMovement, RegisterObjectForgottenDTO, RegisterObjectLostDTO } from "../types/registers";
import { BaseUrl } from "./api";



//funcion que me trae los registros actuales activos en el home
export async function getRegisters(): Promise<GetRegisterDTO[] | null> {
    try {
        const response = await fetch(`${BaseUrl}/traer_registros`, { credentials: 'include' as RequestCredentials })
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
        return null
    }
}


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

//functin que me trae los registros de los objetos perdidos
export async function getRegisterObjectLostByName(type: boolean, name: string): Promise<RegisterObjectLostDTO[] | null> {
    let objectType = ''
    if (!type) {
        objectType = 'objetos_devueltos'
    } else {
        objectType = 'objetos_perdidos'
    }
    try {
        const response = await fetch(`${BaseUrl}/traer_${objectType}?tipo_objeto=${name}`, { credentials: 'include' as RequestCredentials })
        const data = await response.json()
        return data

    } catch (error) {
        console.error(error)
        return []
    }
}
//function que me trae los registros de los objetos olvidados
export async function getRegisterObjectForgottenByName(type: boolean, name: string): Promise<RegisterObjectForgottenDTO[] | null> {
    let urlByType = ''
    if (!type) {
        urlByType = '_retirados'

    }
    try {
        const response = await fetch(`${BaseUrl}/traer_registros_olvidados${urlByType}?tipo_objeto=${name}`, { credentials: 'include' as RequestCredentials })
        const data = await response.json()
        return data

    } catch (error) {
        console.error(error)
        return []
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

//funcion que me trae el registro de objeto olvidado por id_registro
export async function getRegisterObjectForgottenById(id: number): Promise<GetRegisterByIdRegisterDTO | null> {
    try {
        const response = await fetch(`${BaseUrl}/traer_registro_olvidado_x_id?id_registro_olvidado=${id}`, { credentials: 'include' as RequestCredentials })
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error)
        return null
    }
}



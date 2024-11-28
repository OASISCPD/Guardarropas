import { BaseUrl } from "../logic/api"

export interface GetTypeDTO {
    estado: string
    id_lugar: number
    numero: number
    tipo: string
}

interface typeFetch {
    type: string
}

export async function getPlacesByType({ type }: typeFetch) {
    try {
        const response = await fetch(`${BaseUrl}/traer_lugares?tipo=${type}`, { credentials: 'include' as RequestCredentials })
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error)
    }
}

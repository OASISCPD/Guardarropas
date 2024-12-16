import { BaseUrl } from "./api"

export async function ChangedValueOfObjectLost(id: number, value: string) {
    try {
        const response = await fetch(`${BaseUrl}/actualizar_estado_objeto?id_objeto_perdido=${id}&estado=${value}`, { credentials: 'include' as RequestCredentials })
        return response
    } catch (error) {
        console.error(error)
    }
}

export async function ChangedValueOfObjectForgotten(id: number, value: string) {
    try {
        const response = await fetch(`${BaseUrl}/actualizar_estado_registro_olvidado?estado=${value}&id_registro_olvidado=${id}`, { credentials: 'include' as RequestCredentials })
        return response
    } catch (error) {
        console.error(error)
    }
}

export async function ChangedValueOfGarment(id_register: number, value: string, id_garment: number) {
    try {
        const response = await fetch(`${BaseUrl}/actualizar_estado_prenda?estado=${value}&id_registro_olvidado=${id_register}&id_prenda_olvidada=${id_garment}`, { credentials: 'include' as RequestCredentials })
        return response
    } catch (error) {
        console.error(error)
    }
}
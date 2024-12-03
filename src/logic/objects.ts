import { BaseUrl } from "./api"

export async function ChangedValueOfObjectLost(id: number, value: string) {
    try {
        const response = await fetch(`${BaseUrl}/actualizar_estado_objeto?id_objeto_perdido=${id}&estado=${value}`, { credentials: 'include' as RequestCredentials })
        return response
    } catch (error) {
        console.error(error)
    }
}
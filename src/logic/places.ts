import { typeFetch } from "../types/box";
import { BaseUrl } from "./api";

export function getPlacesClass(state: string): string {
    switch (state.toUpperCase()) {
        case 'LIBRE':
            return 'bg-colorGreen hover:bg-green-600';
        case 'OCUPADO':
            return 'bg-colorRed hover:bg-red-600';
        case 'OLVIDADO':
            return 'bg-colorYellow hover:bg-yellow-600';
        default:
            return '';
    }
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

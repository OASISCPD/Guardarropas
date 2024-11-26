import { BaseUrl } from "./api";

export interface getUserSessionDTO {
    nombre: string
    legajo: string | number
}

export async function getUserSession(): Promise<getUserSessionDTO | null> {
    try {
        const response = await fetch(`${BaseUrl}/user`, {
            method: "GET", // Puedes ajustar el método según tu implementación en el servidor
            credentials: "include", // Asegúrate de incluir las cookies
            redirect: "follow",
        });
        if (!response.ok) {
            console.error(`Error: ${response.status} - ${response.statusText}`);
            return null; // Retorna null si hay un error en la respuesta
        }

        const data: getUserSessionDTO = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null
    }
}

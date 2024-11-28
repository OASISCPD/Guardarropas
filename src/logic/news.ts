import { GetNewsDTO } from "../types/news";
import { BaseUrl } from "./api"

export async function getNewsByDate(date: string): Promise<GetNewsDTO[] | null> {
    try {
        const response = await fetch(`${BaseUrl}/traer_novedades?fecha=${date}`, { credentials: 'include' as RequestCredentials })
        const data = await response.json();
        return data
    } catch (error) {
        console.log(error)
        return null
    }
}
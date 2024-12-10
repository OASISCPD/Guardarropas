import { useEffect, useState } from "react"
import { getNewsByDate } from "../../logic/news"
import { GetNewsDTO } from "../../types/news"
import { ScrollContainer } from "../logic/ScrollContainer"
import { CardLoading } from "./CardLoading"

interface propComponent {
    date: string
}
export function ListNewsRegister({ date }: propComponent) {
    //loading para mientras busca la data
    const [loading, setLoading] = useState<boolean>(false)
    const [news, setNews] = useState<GetNewsDTO[]>()

    async function getData(value: string) {
        setLoading(true)
        try {
            const data: GetNewsDTO[] | null = await getNewsByDate(value);
            if (!data) {
                setNews([])
                return
            }
            setNews(data)
        } catch (error) {
            console.error(error)
            setNews([])
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getData(date)
    }, [date])

    return (
        <div className="text-xs">

            <ScrollContainer maxHeight="500px">
                {loading ? (
                    [...Array(4)].map((_, i) =>
                        <CardLoading key={i} />
                    )
                ) :
                    news && news.length > 0 ? (
                        news.map((item, index) => (
                            <div key={index} className="p-4 my-2 bg-colorGray rounded-md shadow-sm">
                                <div className="mb-2">
                                    <h1 className="flex items-center">
                                        Ingresado por:
                                        <span className="ml-2">{item.usuario}</span>
                                    </h1>
                                    <h1 className="flex items-center">
                                        Fecha y hora:
                                        <span className="ml-2">{item.fecha_actualizacion}</span>
                                    </h1>
                                </div>
                                <h1 className="flex items-center text-colorMsjYellow">
                                    Mensaje:
                                    <span className="ml-2 text-white">{item.mensaje}</span>
                                </h1>
                            </div>
                        ))
                    ) : (
                        <div className="p-4 my-2 bg-colorGray rounded-md shadow-sm flex flex-col items-center justify-center">
                            <h1 className="text-lg text-colorRed">Sin datos disponibles</h1>
                            <p className="text-white mt-2">No se encontraron novedades para la fecha seleccionada.</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-12 h-12 text-white mt-4"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 3h.01M21 12c0 4.97-4.03 9-9 9S3 16.97 3 12 7.03 3 12 3s9 4.03 9 9z" />
                            </svg>
                        </div>
                    )
                }
            </ScrollContainer >
        </div >
    )
}
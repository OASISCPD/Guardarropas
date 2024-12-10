import { useEffect, useState } from "react"
import { getNewsByDate } from "../../logic/news"
import { GetNewsDTO } from "../../types/news"
import { ScrollContainer } from "../logic/ScrollContainer"
import { CardLoading } from "./CardLoading"
import { CardNoData } from "../cards/CardNoData"

interface propComponent {
    date: string
    boolean: boolean
}
export function ListNewsRegister({ date, boolean }: propComponent) {
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

    useEffect(() => {
        console.log(boolean)
        getData('')
    }, [boolean])

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
                        <CardNoData  type="news"/>
                    )
                }
            </ScrollContainer >
        </div >
    )
}
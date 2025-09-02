import { useEffect, useState } from "react"
import { getNewsByDate } from "../../logic/news"
import { GetNewsDTO } from "../../types/news"
import { ScrollContainer } from "../logic/ScrollContainer"
import { CardLoading } from "./CardLoading"
import { CardNoData } from "../cards/CardNoData"
import { FiUser, FiClock, FiMessageCircle, FiBell } from "react-icons/fi"
import { HiOutlineSpeakerphone } from "react-icons/hi"

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
        <div className="p-4">
            <ScrollContainer maxHeight="500px">
                <div className="space-y-8">
                    {loading ? (
                        [...Array(4)].map((_, i) =>
                            <CardLoading key={i} />
                        )
                    ) :
                        news && news.length > 0 ? (
                            news.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-slate-900 border border-slate-500 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden group"
                                >
                                    {/* Header de la card */}
                                    <div className="bg-slate-700 px-4 py-3 border-b border-slate-700">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                                                    <HiOutlineSpeakerphone className="w-4 h-4 text-colorOrange" />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-medium text-slate-100">
                                                        Nuevo Mensaje <span className="text-colorOrange">#{item.id_novedad}</span>
                                                    </h3>
                                                    <p className="text-xs text-slate-400">
                                                        Comunicado del sistema
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <FiBell className="w-4 h-4 text-colorOrange animate-pulse" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contenido de la card */}
                                    <div className="p-4 bg-slate-800">
                                        <div className="space-y-4">
                                            {/* Información del autor y fecha */}
                                            <div className="grid grid-cols-1  sm:grid-cols-2 gap-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-shrink-0">
                                                        <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center">
                                                            <FiUser className="w-3 h-3 text-slate-300" />
                                                        </div>
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-xs text-slate-400">Publicado por</p>
                                                        <p className="text-sm font-medium text-slate-100 capitalize">
                                                            {item.usuario?.toLowerCase()}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <div className="flex-shrink-0">
                                                        <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center">
                                                            <FiClock className="w-3 h-3 text-slate-300" />
                                                        </div>
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-xs text-slate-400">Fecha y hora</p>
                                                        <p className="text-sm font-medium text-slate-100">
                                                            {item.fecha_actualizacion}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Mensaje principal */}
                                            <div className="bg-slate-700 rounded-lg p-4 border border-blue-900">
                                                <div className="flex items-start gap-3">
                                                    <div className="flex-shrink-0 mt-1">
                                                        <FiMessageCircle className="w-5 h-5 text-colorOrange" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-sm font-medium text-colorOrange mb-2">
                                                            Mensaje:
                                                        </h4>
                                                        <p className="text-slate-100 text-sm leading-relaxed">
                                                            {item.mensaje}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Footer con indicador de estado */}
                                            <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-colorGreen rounded-full animate-pulse"></div>
                                                    <span className="text-xs text-slate-400">Mensaje activo</span>
                                                </div>
                                                <div className="text-xs text-colorOrange">
                                                    ID: {item.id_novedad}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Efecto hover en el borde */}
                                    {/*  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-colorOrange to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div> */}
                                </div>
                            ))
                        ) : (
                            <CardNoData type="news" />
                        )
                    }
                </div>
            </ScrollContainer>
        </div>
    )
}
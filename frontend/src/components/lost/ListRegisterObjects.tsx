import { useEffect, useState } from "react";
import { RegisterObjectLostDTO } from "../../types/registers";
import { TypeModalObjectLost } from "../../types/modal";
import { getRegisterObjectLostByName } from "../../logic/register";
import { LoaderRegisterMobile } from "../loaders/LoaderRegister";
import { Modal } from "../logic/Modal";
import { getTextColorForState } from "../../logic/colors";
import { ModalChangedStateObjectLost } from "../mod/ModalChangedStateObjectLost";
import { CardNoData } from "../cards/CardNoData";
import { BiPrinter, BiImageAlt } from "react-icons/bi";
import { FiPackage, FiCalendar, FiMapPin, FiUser, FiSettings } from "react-icons/fi";
import { MdColorLens, MdBusiness } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi";

interface propList {
    name: string
    state: boolean
}


export function ListRegisterObjects({ name, state }: propList) {
    //constante que almacena los registros
    const [registers, setRegisters] = useState<RegisterObjectLostDTO[]>()
    //constante que maneja el loading en el componente para mostrar un loading
    const [loading, setLoading] = useState<boolean>(false)
    //constante que habilita el modal para ver los movimientos segun el id
    const [modal, setModal] = useState<TypeModalObjectLost>()
    const [debouncedScanValue, setDebouncedScanValue] = useState('');//variable que maneja el tiempo de timoeut y q no se mande hasta que se deje de tipear


    async function getData(value: string) {
        setLoading(true)
        try {
            const data = await getRegisterObjectLostByName(state, value);
            if (!data) {
                console.log('No hay datos')
                setRegisters([])
                return
            }
            setRegisters(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handlePrint = (register: RegisterObjectLostDTO) => {
        sessionStorage.setItem("lostObjectToPrint", JSON.stringify(register));
        window.open("/printTicketLost", "_blank");
    };

    const handleViewImage = (register: RegisterObjectLostDTO) => {
        // Aquí puedes implementar la lógica para mostrar la imagen
        // Por ahora, abrimos una nueva ventana con la imagen si existe
        if (register.imagen_url) {
            window.open(register.imagen_url, "_blank");
        } else {
            alert("No hay imagen asociada a este objeto");
        }
    };

    useEffect(() => {
        if (name.toString() === '') {
            return
        }
        // Llama a la función siempre que `debouncedScanValue` cambie
        getData(name)
    }, [debouncedScanValue]);

    function openModal(id: number, state: string) {
        if (state.toUpperCase() === "RETIRADO" || state.toUpperCase() === "DONADO") {
            console.log('ya fue pasado a inactivo')
            return
        }
        setModal({ id: id, state: true, stateObject: state })
    }

    function closeModal() {
        setModal({ id: 0, state: false, stateObject: '' })
    }


    useEffect(() => {
        setLoading(true)
        const timer = setTimeout(() => {
            if (!name || name.toString().trim() === "") {
                console.log("name vacío desde el padre recibido en el hijo.");
                getData(name)
                return
            }
            // Si el valor de `name` está vacío, actualiza `debouncedScanValue` para reflejarlo
            setDebouncedScanValue(name.toString())
        }, 1000)

        return () => {
            clearTimeout(timer)
        }
    }, [name, state])
    return (
        <div className="py-8">
            <div className="overflow-hidden rounded-lg shadow-xl border border-slate-600">
                {loading ? (
                    <div className="p-8">
                        <LoaderRegisterMobile />
                    </div>
                ) : registers && registers.length > 0 ? (
                    <>
                        {/* Vista Desktop - Tabla */}
                        <div className="hidden lg:block">
                            <div style={{ maxHeight: '600px', overflowY: 'auto', overflowX: 'auto' }}>
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="text-xs uppercase bg-slate-800 text-slate-200 font-semibold">
                                            <th className="py-4 px-4 text-left whitespace-nowrap border-b border-slate-600">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-2 h-2 bg-colorOrange rounded-full"></span>
                                                    ID
                                                </div>
                                            </th>
                                            <th className="py-4 px-4 text-left whitespace-nowrap border-b border-slate-600">
                                                <div className="flex items-center gap-2">
                                                    <FiPackage className="w-4 h-4 text-slate-400" />
                                                    Objeto
                                                </div>
                                            </th>
                                            <th className="py-4 px-4 text-left whitespace-nowrap border-b border-slate-600">
                                                <div className="flex items-center gap-2">
                                                    <HiOutlineDocumentText className="w-4 h-4 text-slate-400" />
                                                    Detalle
                                                </div>
                                            </th>
                                            <th className="py-4 px-4 text-left whitespace-nowrap border-b border-slate-600">
                                                <div className="flex items-center gap-2">
                                                    <MdBusiness className="w-4 h-4 text-slate-400" />
                                                    Marca
                                                </div>
                                            </th>
                                            <th className="py-4 px-4 text-left whitespace-nowrap border-b border-slate-600">
                                                <div className="flex items-center gap-2">
                                                    <MdColorLens className="w-4 h-4 text-slate-400" />
                                                    Color
                                                </div>
                                            </th>
                                            <th className="py-4 px-4 text-left whitespace-nowrap border-b border-slate-600">
                                                <div className="flex items-center gap-2">
                                                    <FiCalendar className="w-4 h-4 text-slate-400" />
                                                    Fecha Encontrada
                                                </div>
                                            </th>
                                            <th className="py-4 px-4 text-left whitespace-nowrap border-b border-slate-600">
                                                <div className="flex items-center gap-2">
                                                    <FiMapPin className="w-4 h-4 text-slate-400" />
                                                    Lugar
                                                </div>
                                            </th>
                                            <th className="py-4 px-4 text-left whitespace-nowrap border-b border-slate-600">
                                                <div className="flex items-center gap-2">
                                                    <FiUser className="w-4 h-4 text-slate-400" />
                                                    Responsable
                                                </div>
                                            </th>
                                            <th className="py-4 px-4 text-left whitespace-nowrap border-b border-slate-600">
                                                <div className="flex items-center gap-2">
                                                    <MdBusiness className="w-4 h-4 text-slate-400" />
                                                    Sector
                                                </div>
                                            </th>
                                            <th className="py-4 px-4 text-center whitespace-nowrap border-b border-slate-600">
                                                <div className="flex items-center justify-center gap-2">
                                                    <FiSettings className="w-4 h-4 text-slate-400" />
                                                    Estado
                                                </div>
                                            </th>
                                            <th className="py-4 px-4 text-center whitespace-nowrap border-b border-slate-600">
                                                <div className="flex items-center justify-center gap-2">
                                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                                                    </svg>
                                                    Acciones
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-slate-900 divide-y divide-slate-700">
                                        {registers.map((register) => (
                                            <tr
                                                key={register.id_objeto_perdido}
                                                className="hover:bg-slate-800/50 transition-colors duration-200 group"
                                            >
                                                <td className="py-4 px-4 text-left">
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-700 text-slate-200 border border-slate-600">
                                                        #{register.id_objeto_perdido}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-left">
                                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-indigo-900/50 text-indigo-200 border border-indigo-700 capitalize">
                                                        {register.tipo_objeto?.toLowerCase()}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-left">
                                                    <div className="text-slate-100 font-medium text-xs capitalize max-w-xs truncate" title={register.detalle}>
                                                        {register.detalle?.toLowerCase()}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-left">
                                                    <span className="text-slate-100 text-xs capitalize">
                                                        {register.marca?.toLowerCase() || 'Sin marca'}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-left">
                                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-pink-900/50 text-pink-200 border border-pink-700 capitalize">
                                                        {register.color?.toLowerCase()}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-left">
                                                    <div className="text-slate-100 font-medium text-xs">
                                                        {register.fecha_hora_encuentro}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-left">
                                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-900/50 text-green-200 border border-green-700 capitalize">
                                                        {register.lugar_de_encuentro?.toLowerCase()}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-left">
                                                    <div className="text-slate-100 font-medium text-xs capitalize">
                                                        {register.persona_que_encontro?.toLowerCase()}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-left">
                                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-900/50 text-orange-200 border border-orange-700 capitalize">
                                                        {register.sector?.toLowerCase()}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-center">
                                                    <button 
                                                        onClick={() => openModal(register.id_objeto_perdido, register.estado)} 
                                                        className={`px-2 py-1 rounded text-xs font-medium cursor-pointer transition-all duration-200 hover:scale-105 ${getTextColorForState(register.estado)}`}
                                                        disabled={register.estado.toUpperCase() === "RETIRADO" || register.estado.toUpperCase() === "DONADO"}
                                                    >
                                                        {register.estado}
                                                    </button>
                                                </td>
                                                <td className="py-4 px-4 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => handleViewImage(register)}
                                                            className="inline-flex items-center p-2 rounded-md bg-green-600 hover:bg-green-700 text-white transition-all duration-200 hover:scale-105"
                                                            title="Ver imagen"
                                                        >
                                                            <BiImageAlt className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handlePrint(register)}
                                                            className="inline-flex items-center p-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 hover:scale-105"
                                                            title="Imprimir ticket"
                                                        >
                                                            <BiPrinter className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Vista Mobile - Cards */}
                        <div className="lg:hidden space-y-4 p-4 max-h-96 overflow-y-auto">
                            {registers.map((register) => (
                                <div
                                    key={register.id_objeto_perdido}
                                    className="bg-slate-900 border border-slate-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden"
                                >
                                    {/* Header de la card */}
                                    <div className="bg-slate-800 px-4 py-3 border-b border-slate-700">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-700 text-slate-200 border border-slate-600">
                                                    #{register.id_objeto_perdido}
                                                </span>
                                                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-indigo-900/50 text-indigo-200 border border-indigo-700 capitalize">
                                                    {register.tipo_objeto?.toLowerCase()}
                                                </span>
                                            </div>
                                            <button 
                                                onClick={() => openModal(register.id_objeto_perdido, register.estado)} 
                                                className={`px-2 py-1 rounded text-xs font-medium cursor-pointer transition-all duration-200 ${getTextColorForState(register.estado)}`}
                                                disabled={register.estado.toUpperCase() === "RETIRADO" || register.estado.toUpperCase() === "DONADO"}
                                            >
                                                {register.estado}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Contenido de la card */}
                                    <div className="p-4">
                                        <div className="space-y-3">
                                            {/* Información del objeto */}
                                            <div className="flex items-start gap-3">
                                                <div className="flex-shrink-0">
                                                    <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                                                        <FiPackage className="w-4 h-4 text-slate-300" />
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-slate-100 font-medium text-sm capitalize">
                                                        {register.detalle?.toLowerCase()}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-slate-400 text-xs">Marca:</span>
                                                        <span className="text-slate-100 text-xs capitalize">
                                                            {register.marca?.toLowerCase() || 'Sin marca'}
                                                        </span>
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-pink-900/50 text-pink-200 border border-pink-700 capitalize">
                                                            {register.color?.toLowerCase()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Información de encuentro */}
                                            <div className="grid grid-cols-1 gap-2">
                                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                                    <FiCalendar className="w-3 h-3 text-blue-500" />
                                                    <span className="text-slate-300">Encontrado:</span>
                                                    <span>{register.fecha_hora_encuentro}</span>
                                                </div>
                                                
                                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                                    <FiMapPin className="w-3 h-3 text-green-500" />
                                                    <span className="text-slate-300">Lugar:</span>
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-900/50 text-green-200 border border-green-700 capitalize">
                                                        {register.lugar_de_encuentro?.toLowerCase()}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                                    <FiUser className="w-3 h-3 text-purple-500" />
                                                    <span className="text-slate-300">Responsable:</span>
                                                    <span className="capitalize">
                                                        {register.persona_que_encontro?.toLowerCase()}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                                    <MdBusiness className="w-3 h-3 text-orange-500" />
                                                    <span className="text-slate-300">Sector:</span>
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-900/50 text-orange-200 border border-orange-700 capitalize">
                                                        {register.sector?.toLowerCase()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer con acciones */}
                                    <div className="bg-slate-800 px-4 py-3 border-t border-slate-700">
                                        <div className="flex items-center justify-center gap-3">
                                            <button
                                                onClick={() => handleViewImage(register)}
                                                className="flex-1 inline-flex items-center justify-center px-3 py-2 text-xs font-medium rounded-md bg-green-600 hover:bg-green-700 text-white border border-green-500 hover:border-green-600 transition-all duration-200"
                                            >
                                                <BiImageAlt className="w-3 h-3 mr-1.5" />
                                                Ver Imagen
                                            </button>
                                            <button
                                                onClick={() => handlePrint(register)}
                                                className="flex-1 inline-flex items-center justify-center px-3 py-2 text-xs font-medium rounded-md bg-blue-600 hover:bg-blue-700 text-white border border-blue-500 hover:border-blue-600 transition-all duration-200"
                                            >
                                                <BiPrinter className="w-3 h-3 mr-1.5" />
                                                Imprimir
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="p-8">
                        <CardNoData type="lost" />
                    </div>
                )}
            </div>
            {modal && modal.state && (
                <Modal isOpen={true} onClose={closeModal}>
                    <ModalChangedStateObjectLost state={modal.stateObject} id={modal.id} onClose={closeModal} success={() => { getData(''), closeModal() }} />
                </Modal>
            )}
        </div >
    )
}
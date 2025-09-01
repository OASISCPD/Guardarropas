import { useEffect, useState } from "react";
import { getRegisterByDniHistorical, getRegisterHistorical } from "../../logic/register";
import { TypeModal } from "../../types/modal";
import { Modal } from "../logic/Modal";
import { ModalMovementRegister } from "../mod/ModalMovementRegister";
import { RegisterHistoricalDTO } from "../../types/registers";
import { LoaderRegisterMobile } from "../loaders/LoaderRegister";
import { CardNoData } from "../cards/CardNoData";
import { MdCreditCard } from "react-icons/md";
import { FiEye } from "react-icons/fi";

interface propList {
    dni: string | number
}

export function ListRegister({ dni }: propList) {
    //constante que almacena los registros
    const [registers, setRegisters] = useState<RegisterHistoricalDTO[]>()
    //constante que maneja el loading en el componente para mostrar un loading
    const [loading, setLoading] = useState<boolean>(false)
    //constante que habilita el modal para ver los movimientos segun el id
    const [modal, setModal] = useState<TypeModal>()
    const [debouncedScanValue, setDebouncedScanValue] = useState('');//variable que maneja el tiempo de timoeut y q no se mande hasta que se deje de tipear

    async function getData() {
        setLoading(true)
        const data = await getRegisterHistorical();
        if (!data) {
            console.log('no hay datos')
            return
        }
        setRegisters(data)
        setLoading(false)
    }

    function openModal(id: number) {
        setModal({ id: id, state: true })
    }

    function closeModal() {
        setModal({ id: 0, state: false })
    }

    //funcion que busca en los registros por el dni
    async function getDataByDni() {
        if (!dni || dni.toString().trim() === "") {
            console.log("DNI vacío desde el padre recibido en el hijo.");
            return
        }
        try {
            const data = await getRegisterByDniHistorical(dni)
            if (!data) {
                return
            }
            setRegisters(data)
            setLoading(false)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    // Función para determinar estado
    const getStatus = (datetime_egreso: string | null) => {
        return datetime_egreso ? 'retirado' : 'activo';
    };

    useEffect(() => {
        // Llama a la función siempre que `debouncedScanValue` cambie
        getDataByDni()
    }, [debouncedScanValue]);

    useEffect(() => {
        setLoading(true)
        const timer = setTimeout(() => {
            if (!dni || dni.toString().trim() === "") {
                console.log("DNI vacío desde el padre recibido en el hijo.");
                getData()
                return
            }
            // Si el valor de `dni` está vacío, actualiza `debouncedScanValue` para reflejarlo
            setDebouncedScanValue(dni.toString())
        }, 1000)

        return () => {
            clearTimeout(timer)
        }

    }, [dni])

    return (
        <div className="p-4 rounded-lg">
            <div className=" rounded-lg overflow-auto max-h-[500px] shadow-xl border border-slate-600">
                {loading ? (
                    <div className="p-8">
                        <LoaderRegisterMobile />
                    </div>
                ) : registers && registers.length > 0 ? (
                    <>
                        {/* Vista Desktop - Tabla */}
                        <div className="hidden lg:block">
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
                                                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m0 4h14" />
                                                </svg>
                                                Fecha Ingreso
                                            </div>
                                        </th>
                                        <th className="py-4 px-4 text-left whitespace-nowrap border-b border-slate-600">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                                Fecha Egreso
                                            </div>
                                        </th>
                                        <th className="py-4 px-4 text-left whitespace-nowrap border-b border-slate-600">
                                            <div className="flex items-center gap-2">
                                                <MdCreditCard className="w-4 h-4 text-slate-400" />
                                                DNI
                                            </div>
                                        </th>
                                        <th className="py-4 px-4 text-left whitespace-nowrap border-b border-slate-600">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Cliente
                                            </div>
                                        </th>
                                        <th className="py-4 px-4 text-left whitespace-nowrap border-b border-slate-600">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                Lugar
                                            </div>
                                        </th>
                                        <th className="py-4 px-4 text-center whitespace-nowrap border-b border-slate-600">
                                            <div className="flex items-center justify-center gap-2">
                                                <FiEye className="w-4 h-4 text-slate-400" />
                                                Acciones
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-slate-900 divide-y divide-slate-700">
                                    {registers.map((register) => {
                                        return (
                                            <tr
                                                key={register.id_registro}
                                                className="hover:bg-slate-800/50 transition-colors duration-200 group"
                                            >
                                                <td className="py-4 px-4 text-left">
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-700 text-slate-200 border border-slate-600">
                                                        #{register.id_registro}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-left">
                                                    <div className="text-slate-100 font-medium text-xs">
                                                        {register.datetime_ingreso}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-left">
                                                    {register.datetime_egreso ? (
                                                        <div className="text-slate-100 font-medium text-xs">
                                                            {register.datetime_egreso}
                                                        </div>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-900/50 text-yellow-200 border border-yellow-700">
                                                            Pendiente
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-4 text-left">
                                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-900/50 text-blue-200 border border-blue-700">
                                                        {register.n_documento}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-left">
                                                    <div className="text-slate-100 font-medium text-xs capitalize">
                                                        {register.apellido_nombre.toLowerCase()}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-left">
                                                    {register.lugares_ocupados ? (
                                                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-900/50 text-orange-200 border border-orange-700">
                                                            {register.lugares_ocupados}
                                                        </span>
                                                    ) : (
                                                        <span className="text-slate-500 text-xs">{`----------->`}</span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-4 text-center">
                                                    <button
                                                        onClick={() => openModal(register.id_registro)}
                                                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md bg-green-600 hover:bg-green-700 text-white border border-green-500 hover:border-green-600 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                                                        title="Ver movimientos"
                                                    >
                                                        <FiEye className="w-3 h-3 mr-1" />
                                                        Ver Movimiento
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Vista Mobile - Cards */}
                        <div className="lg:hidden space-y-4 p-4">
                            {registers.map((register) => {
                                const status = getStatus(register.datetime_egreso);
                                return (
                                    <div
                                        key={register.id_registro}
                                        className="bg-slate-900 border border-slate-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden"
                                    >
                                        {/* Header de la card */}
                                        <div className="bg-slate-800 px-4 py-3 border-b border-slate-700">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-700 text-slate-200 border border-slate-600">
                                                        #{register.id_registro}
                                                    </span>
                                                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${status === 'retirado'
                                                        ? 'bg-green-900/50 text-green-200 border border-green-700'
                                                        : 'bg-yellow-900/50 text-yellow-200 border border-yellow-700'
                                                        }`}>
                                                        {status === 'retirado' ? 'Retirado' : 'Activo'}
                                                    </span>
                                                </div>
                                                <div className="text-xs text-slate-400">
                                                    {register.datetime_ingreso?.split(' ')[1]}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Contenido de la card */}
                                        <div className="p-4">
                                            <div className="space-y-3">
                                                {/* Información del cliente */}
                                                <div className="flex items-start gap-3">
                                                    <div className="flex-shrink-0">
                                                        <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                                                            <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-slate-100 font-medium text-sm capitalize">
                                                            {register.apellido_nombre.toLowerCase()}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <MdCreditCard className="w-3 h-3 text-slate-400" />
                                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-900/50 text-blue-200 border border-blue-700">
                                                                {register.n_documento}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Información de fechas */}
                                                <div className="grid grid-cols-1 gap-2">
                                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                                        <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m0 4h14" />
                                                        </svg>
                                                        <span className="text-slate-300">Ingreso:</span>
                                                        <span>{register.datetime_ingreso}</span>
                                                    </div>

                                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                                        <svg className="w-3 h-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                        </svg>
                                                        <span className="text-slate-300">Egreso:</span>
                                                        <span>
                                                            {register.datetime_egreso ? register.datetime_egreso : 'Pendiente'}
                                                        </span>
                                                    </div>

                                                    {register.lugares_ocupados && (
                                                        <div className="flex items-center gap-2 text-xs text-slate-400">
                                                            <svg className="w-3 h-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            </svg>
                                                            <span className="text-slate-300">Lugar:</span>
                                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-900/50 text-orange-200 border border-orange-700">
                                                                {register.lugares_ocupados}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Footer con acción */}
                                        <div className="bg-slate-800 px-4 py-3 border-t border-slate-700">
                                            <button
                                                onClick={() => openModal(register.id_registro)}
                                                className="w-full inline-flex items-center justify-center px-3 py-2 text-xs font-medium rounded-md bg-green-600 hover:bg-green-700 text-white border border-green-500 hover:border-green-600 transition-all duration-200"
                                            >
                                                <FiEye className="w-3 h-3 mr-1.5" />
                                                Ver Movimientos Detallados
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <div className="p-8">
                        <CardNoData type="history" />
                    </div>
                )}
            </div>
            {modal && modal.state && (
                <Modal isOpen={true} onClose={closeModal}>
                    <ModalMovementRegister id={modal.id} onClose={closeModal} />
                </Modal>
            )}
        </div>
    )
}
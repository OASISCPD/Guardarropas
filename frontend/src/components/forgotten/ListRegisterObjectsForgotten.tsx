import { useEffect, useState } from "react"
import { RegisterObjectForgottenDTO } from "../../types/registers"
import { TypeModal, TypeModalObjectLost } from "../../types/modal";
import { getRegisterObjectForgottenByName } from "../../logic/register";
import { LoaderRegisterMobile } from "../loaders/LoaderRegister";
import { getTextColorForStateForgotten } from "../../logic/colors";
import { Modal } from "../logic/Modal";
import { ModalViewObjectForgotten } from "../mod/ModalViewObjectForgotten";
import { CardNoData } from "../cards/CardNoData";
import { ModalChangedStateObjectForgotten } from "../mod/ModalChangedStateObjectForgotten";
import { FiUser, FiCalendar, FiEye, FiSettings, FiPrinter } from "react-icons/fi";
import { MdCreditCard, MdPhone, MdBusiness } from "react-icons/md";
import { HiOutlineClipboardList } from "react-icons/hi";

interface propList {
    dni: string
    state: boolean
}
export function ListRegisterObjectsForgotten({ dni, state }: propList) {
    //constante que almacena los registros 
    const [registers, setRegisters] = useState<RegisterObjectForgottenDTO[]>();
    //constante que maneja el loading en el componente para mostrar un loading mientras carga los fetchs
    const [loading, setLoading] = useState<boolean>(false)
    //constante que me habilita el modal para ver los objetos olvidados en cuestion
    const [modal, setModal] = useState<TypeModalObjectLost>()
    console.log(modal)
    //constante que habilita el modal para ver nomas los datos del usuario
    const [modalView, setModalView] = useState<TypeModal>()
    //variable que maneja el tiempo de timoeut y q no se mande hasta que se deje de tipear
    const [debouncedScanValue, setDebouncedScanValue] = useState('')

    async function getData(value: string) {
        setLoading(true)
        try {
            const data = await getRegisterObjectForgottenByName(state, value);
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

    const handlePrint = (register: RegisterObjectForgottenDTO) => {
        sessionStorage.setItem("forgottenObjectToPrint", JSON.stringify(register));
        window.open("/printTicketForgotten", "_blank");
    };

    //modal que muestra la data del objeto perdido en cuestion
    function openModalView(id: number) {
        setModalView({
            id: id,
            state: true
        })
    }
    //funcion que cierra el modal
    function closeModal() {
        setModal({ id: 0, state: false, stateObject: '' })
        setModalView({ id: 0, state: false })
    }

    function openModal(id: number, state: string) {
        if (state.toUpperCase() === "RETIRADO" || state.toUpperCase() === "DONADO") {
            console.log('ya fue pasado a inactivo')
            return
        }
        setModal({ id: id, state: true, stateObject: state })
    }

    useEffect(() => {
        if (dni.toString() === '') {
            return
        }
        // Llama a la función siempre que `debouncedScanValue` cambie
        getData(dni)
    }, [debouncedScanValue]);

    useEffect(() => {
        setLoading(true)
        const timer = setTimeout(() => {
            if (!dni || dni.toString().trim() === "") {
                console.log("dni vacío desde el padre recibido en el hijo.");
                getData(dni)
                return
            }
            // Si el valor de `dni` está vacío, actualiza `debouncedScanValue` para reflejarlo
            setDebouncedScanValue(dni.toString())
        }, 1000)

        return () => {
            clearTimeout(timer)
        }
    }, [dni, state])
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
                                                    <FiUser className="w-4 h-4 text-slate-400" />
                                                    Cliente
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
                                                    <MdPhone className="w-4 h-4 text-slate-400" />
                                                    Celular
                                                </div>
                                            </th>
                                            <th className="py-4 px-4 text-left whitespace-nowrap border-b border-slate-600">
                                                <div className="flex items-center gap-2">
                                                    <FiCalendar className="w-4 h-4 text-slate-400" />
                                                    Fecha Ingreso
                                                </div>
                                            </th>
                                            <th className="py-4 px-4 text-left whitespace-nowrap border-b border-slate-600">
                                                <div className="flex items-center gap-2">
                                                    <MdBusiness className="w-4 h-4 text-slate-400" />
                                                    Responsable
                                                </div>
                                            </th>
                                            <th className="py-4 px-4 text-center whitespace-nowrap border-b border-slate-600">
                                                <div className="flex items-center justify-center gap-2">
                                                    <HiOutlineClipboardList className="w-4 h-4 text-slate-400" />
                                                    Objetos
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
                                                key={register.id_registro_olvidado}
                                                className="hover:bg-slate-800/50 transition-colors duration-200 group"
                                            >
                                                <td className="py-4 px-4 text-left">
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-700 text-slate-200 border border-slate-600">
                                                        #{register.id_registro_olvidado}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-left">
                                                    <div className="text-slate-100 font-medium text-xs capitalize">
                                                        {register.cliente?.toLowerCase()}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-left">
                                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-900/50 text-blue-200 border border-blue-700">
                                                        {register.n_documento}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-left">
                                                    {register.celular ? (
                                                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-900/50 text-green-200 border border-green-700">
                                                            {register.celular}
                                                        </span>
                                                    ) : (
                                                        <span className="text-slate-500 text-xs">Sin celular</span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-4 text-left">
                                                    <div className="text-slate-100 font-medium text-xs">
                                                        {register.datetime_olvidado}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-left">
                                                    <div className="text-slate-100 font-medium text-xs capitalize">
                                                        {register.usuario?.toLowerCase()}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-center">
                                                    <button
                                                        onClick={() => openModalView(register.id_registro_olvidado)}
                                                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 text-white border border-indigo-500 hover:border-indigo-600 transition-all duration-200 hover:scale-105"
                                                        title="Ver objetos olvidados"
                                                    >
                                                        <FiEye className="w-3 h-3 mr-1" />
                                                        Ver Objetos
                                                    </button>
                                                </td>
                                                <td className="py-4 px-4 text-center">
                                                    <button
                                                        onClick={() => openModal(register.id_registro_olvidado, register.estado_registro)}
                                                        className={`px-2 py-1 rounded text-xs font-medium cursor-pointer transition-all duration-200 hover:scale-105 ${getTextColorForStateForgotten(register.estado_registro)}`}
                                                        disabled={register.estado_registro.toUpperCase() === "RETIRADO" || register.estado_registro.toUpperCase() === "DONADO"}
                                                    >
                                                        {register.estado_registro}
                                                    </button>
                                                </td>
                                                <td className="py-4 px-4 text-center">
                                                    <button
                                                        onClick={() => handlePrint(register)}
                                                        className="inline-flex items-center p-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 hover:scale-105"
                                                        title="Imprimir ticket"
                                                    >
                                                        <FiPrinter className="w-4 h-4" />
                                                    </button>
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
                                    key={register.id_registro_olvidado}
                                    className="bg-slate-900 border border-slate-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden"
                                >
                                    {/* Header de la card */}
                                    <div className="bg-slate-800 px-4 py-3 border-b border-slate-700">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-700 text-slate-200 border border-slate-600">
                                                    #{register.id_registro_olvidado}
                                                </span>
                                                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-900/50 text-blue-200 border border-blue-700">
                                                    DNI: {register.n_documento}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => openModal(register.id_registro_olvidado, register.estado_registro)}
                                                className={`px-2 py-1 rounded text-xs font-medium cursor-pointer transition-all duration-200 ${getTextColorForStateForgotten(register.estado_registro)}`}
                                                disabled={register.estado_registro.toUpperCase() === "RETIRADO" || register.estado_registro.toUpperCase() === "DONADO"}
                                            >
                                                {register.estado_registro}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Contenido de la card */}
                                    <div className="p-4">
                                        <div className="space-y-3">
                                            {/* Información del cliente */}
                                            <div className="flex items-start gap-3">
                                                <div className="flex-shrink-0">
                                                    <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                                                        <FiUser className="w-4 h-4 text-slate-300" />
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-slate-100 font-medium text-sm capitalize">
                                                        {register.cliente?.toLowerCase()}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        {register.celular ? (
                                                            <>
                                                                <MdPhone className="w-3 h-3 text-green-500" />
                                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-900/50 text-green-200 border border-green-700">
                                                                    {register.celular}
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <span className="text-slate-500 text-xs">Sin celular</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Información de registro */}
                                            <div className="grid grid-cols-1 gap-2">
                                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                                    <FiCalendar className="w-3 h-3 text-blue-500" />
                                                    <span className="text-slate-300">Fecha:</span>
                                                    <span>{register.datetime_olvidado}</span>
                                                </div>

                                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                                    <MdBusiness className="w-3 h-3 text-purple-500" />
                                                    <span className="text-slate-300">Responsable:</span>
                                                    <span className="capitalize">
                                                        {register.usuario?.toLowerCase()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer con acciones */}
                                    <div className="bg-slate-800 px-4 py-3 border-t border-slate-700">
                                        <div className="flex items-center justify-center gap-3">
                                            <button
                                                onClick={() => openModalView(register.id_registro_olvidado)}
                                                className="flex-1 inline-flex items-center justify-center px-3 py-2 text-xs font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 text-white border border-indigo-500 hover:border-indigo-600 transition-all duration-200"
                                            >
                                                <FiEye className="w-3 h-3 mr-1.5" />
                                                Ver Objetos
                                            </button>
                                            <button
                                                onClick={() => handlePrint(register)}
                                                className="inline-flex items-center px-3 py-2 text-xs font-medium rounded-md bg-blue-600 hover:bg-blue-700 text-white border border-blue-500 hover:border-blue-600 transition-all duration-200"
                                                title="Imprimir ticket"
                                            >
                                                <FiPrinter className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="p-8">
                        <CardNoData type="forgotten" />
                    </div>
                )}
            </div>
            {modalView && modalView.state && (
                <Modal isOpen={true} onClose={closeModal}>
                    <ModalViewObjectForgotten onClose={closeModal} id={modalView.id} />
                </Modal>
            )}
            {modal && modal.state && (
                <Modal isOpen={true} onClose={closeModal}>
                    <ModalChangedStateObjectForgotten state={modal.stateObject} success={() => { closeModal(), getData('') }} onClose={closeModal} id={modal.id} />
                </Modal>
            )}
        </div>
    )
}
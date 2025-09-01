import { useEffect, useState } from "react";
import { deleteClientById, getClientRegister, getClientsByDni } from "../../logic/clients";
import { TbUserEdit } from "react-icons/tb";
import { MdDelete, MdCreditCard, MdPhone, MdLocationOn } from "react-icons/md";
import { FiUser, FiCalendar, FiMapPin } from "react-icons/fi";
import { HiIdentification } from "react-icons/hi";
import { LoaderRegisterHoverMobile, LoaderRegisterMobile } from "../loaders/LoaderRegister";
import { Modal } from "../logic/Modal";
import { ModalEditClient } from "../mod/ModalEditClient";
import { toast } from "react-toastify";
import { GetClientDTO } from "../../types/client";
import { TypeModal } from "../../types/modal";
import { ModalConfirm } from "../mod/ModalConfirm";
import { CardNoData } from "../cards/CardNoData";
import { ScrollContainer } from "../logic/ScrollContainer";

interface propList {
    dni: string | number
}
export function ListClientsRegister({ dni }: propList) {
    //modal que sirve como confirmacion para la eliminacion del client
    const [modalConfirm, setModalConfirm] = useState<TypeModal>()
    //constante que maneja el loading en el componente para mostrar un loading
    const [loading, setLoading] = useState<boolean>(false)
    //loading hover para que bloquee ciertas acciones como la eliminacion de clientes
    const [loadingHover, setLoadingHover] = useState<boolean>(false)
    //clients
    const [clients, setClients] = useState<GetClientDTO[]>()
    //constante que habilita el modal para ver los movimientos segun el id
    const [debouncedScanValue, setDebouncedScanValue] = useState('');//variable que maneja el tiempo de timoeut y q no se mande hasta que se deje de tipear
    //body para pasar al formulario de edit client 
    const [client, setClient] = useState<GetClientDTO | null>(null)
    //booleano que maneja la habilitacion del modal
    const [modal, setModal] = useState<boolean>(false)
    //function que me habilita el modal y le pasa los valores al body para enviar y abrir el formulario de edicion
    function openModal(body: GetClientDTO) {
        console.log(body)
        setClient(body)
        setModal(true)
    }
    function closeModal() {
        setClient(null)
        setModal(false)
    }
    function closeModalSuccess() {
        setClient(null)
        setModal(false)
        getData()
    }

    async function deleteClient(id: number) {
        closeModalDelete()
        console.log(id)
        setLoadingHover(true)
        try {
            const text = await deleteClientById(id);
            console.log(text)
            toast.success('Cliente eliminado correctamente')
            getData()
        } catch (error) {
            console.error()
            toast.error('Hubo un error, inténtalo nuevamente ')
        } finally {
            setLoadingHover(false)
        }
    }

    //funcion openModal delete donde se setea el valor del id y el valor del estado del modal
    function openModalDelete(id: number) {
        setModalConfirm({
            id: id,
            state: true
        })
    }
    function closeModalDelete() {
        setModalConfirm({
            id: 0,
            state: false
        })
    }
    //function que me trae el general de los clientes
    async function getData() {
        try {
            const data = await getClientRegister();
            if (!data) {
                setClients([])
            }
            console.log(data)
            setClients(data)
        } catch (error) {
            console.error(error)
            setClients([])
        } finally {
            setLoading(false)
        }
    }

    async function getDataByDni() {
        if (!dni || dni.toString().trim() === "") {
            return
        }
        try {
            const data = await getClientsByDni(dni)
            if (!data) {
                setClients([])
                return
            }
            console.log(data)
            setClients(data)
            /*  setRegisters(data) */
            setLoading(false)
        } catch (error) {
            console.error(error)
            setClients([])
        } finally {
            setLoading(false)
        }
    }
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
        <div className="p-4">
            {loadingHover && (
                <LoaderRegisterHoverMobile />
            )}
            {loading ? (
                <LoaderRegisterMobile />
            ) :
                clients && clients.length > 0 ? (
                    <div className="overflow-hidden rounded-lg shadow-xl border border-slate-600">
                        {/* Vista Desktop - Tabla */}
                        <div className="hidden lg:block">
                            <ScrollContainer maxHeight="600px">
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
                                                    <MdCreditCard className="w-4 h-4 text-slate-400" />
                                                    DNI
                                                </div>
                                            </th>
                                            <th className="py-4 px-4 text-left whitespace-nowrap border-b border-slate-600">
                                                <div className="flex items-center gap-2">
                                                    <HiIdentification className="w-4 h-4 text-slate-400" />
                                                    Tipo Doc
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
                                                    <MdPhone className="w-4 h-4 text-slate-400" />
                                                    Celular
                                                </div>
                                            </th>
                                            <th className="py-4 px-4 text-left whitespace-nowrap border-b border-slate-600">
                                                <div className="flex items-center gap-2">
                                                    <FiCalendar className="w-4 h-4 text-slate-400" />
                                                    F. Nacimiento
                                                </div>
                                            </th>
                                            <th className="py-4 px-4 text-left whitespace-nowrap border-b border-slate-600">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    Género
                                                </div>
                                            </th>
                                            <th className="py-4 px-4 text-left whitespace-nowrap border-b border-slate-600">
                                                <div className="flex items-center gap-2">
                                                    <FiMapPin className="w-4 h-4 text-slate-400" />
                                                    Provincia
                                                </div>
                                            </th>
                                            <th className="py-4 px-4 text-left whitespace-nowrap border-b border-slate-600">
                                                <div className="flex items-center gap-2">
                                                    <MdLocationOn className="w-4 h-4 text-slate-400" />
                                                    Localidad
                                                </div>
                                            </th>
                                            <th className="py-4 px-4 text-left whitespace-nowrap border-b border-slate-600">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                    </svg>
                                                    Dirección
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
                                        {clients.map((client) => (
                                            <tr
                                                key={client.id_cliente}
                                                className="hover:bg-slate-800/50 transition-colors duration-200 group"
                                            >
                                                <td className="py-4 px-4 text-left">
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-700 text-slate-200 border border-slate-600">
                                                        #{client.id_cliente}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-left">
                                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-900/50 text-blue-200 border border-blue-700">
                                                        {client.n_documento}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-left">
                                                    <span className="text-slate-100 text-xs capitalize">
                                                        {client.tipo_documento || 'Sin especificar'}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-left">
                                                    <div className="text-slate-100 font-medium text-xs capitalize">
                                                        {`${client.apellido} ${client.nombre}`.toLowerCase()}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-left">
                                                    {client.celular ? (
                                                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-900/50 text-green-200 border border-green-700">
                                                            {client.celular}
                                                        </span>
                                                    ) : (
                                                        <span className="text-slate-500 text-xs">Sin celular</span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-4 text-left">
                                                    <span className="text-slate-100 text-xs">
                                                        {client.date_nacimiento}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-left">
                                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-900/50 text-purple-200 border border-purple-700 capitalize">
                                                        {client.genero?.toLowerCase()}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-left">
                                                    <span className="text-slate-100 text-xs capitalize">
                                                        {client.provincia && client.provincia !== 'undefined' ? client.provincia.toLowerCase() : 'Sin provincia'}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-left">
                                                    <span className="text-slate-100 text-xs capitalize">
                                                        {client.localidad && client.localidad !== 'undefined' ? client.localidad.toLowerCase() : 'Sin localidad'}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-left">
                                                    <span className="text-slate-100 text-xs capitalize">
                                                        {client.direccion && client.direccion !== 'undefined' ? client.direccion.toLowerCase() : 'Sin dirección'}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => openModal(client)}
                                                            className="inline-flex items-center p-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 hover:scale-105"
                                                            title="Editar cliente"
                                                        >
                                                            <TbUserEdit className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => openModalDelete(client.id_cliente)}
                                                            className="inline-flex items-center p-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition-all duration-200 hover:scale-105"
                                                            title="Eliminar cliente"
                                                        >
                                                            <MdDelete className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </ScrollContainer>
                        </div>

                        {/* Vista Mobile - Cards */}
                        <div className="lg:hidden space-y-4 p-4 max-h-96 overflow-y-auto">
                            {clients.map((client) => (
                                <div
                                    key={client.id_cliente}
                                    className="bg-slate-900 border border-slate-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden"
                                >
                                    {/* Header de la card */}
                                    <div className="bg-slate-800 px-4 py-3 border-b border-slate-700">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-700 text-slate-200 border border-slate-600">
                                                    #{client.id_cliente}
                                                </span>
                                                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-900/50 text-blue-200 border border-blue-700">
                                                    DNI: {client.n_documento}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => openModal(client)}
                                                    className="inline-flex items-center p-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
                                                >
                                                    <TbUserEdit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => openModalDelete(client.id_cliente)}
                                                    className="inline-flex items-center p-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition-all duration-200"
                                                >
                                                    <MdDelete className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contenido de la card */}
                                    <div className="p-4">
                                        <div className="space-y-3">
                                            {/* Información personal */}
                                            <div className="flex items-start gap-3">
                                                <div className="flex-shrink-0">
                                                    <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                                                        <FiUser className="w-4 h-4 text-slate-300" />
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-slate-100 font-medium text-sm capitalize">
                                                        {`${client.apellido} ${client.nombre}`.toLowerCase()}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-900/50 text-purple-200 border border-purple-700 capitalize">
                                                            {client.genero?.toLowerCase()}
                                                        </span>
                                                        <span className="text-slate-100 text-xs">
                                                            {client.tipo_documento || 'Sin tipo'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Información de contacto */}
                                            <div className="grid grid-cols-1 gap-2">
                                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                                    <MdPhone className="w-3 h-3 text-green-500" />
                                                    <span className="text-slate-300">Celular:</span>
                                                    {client.celular ? (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-900/50 text-green-200 border border-green-700">
                                                            {client.celular}
                                                        </span>
                                                    ) : (
                                                        <span className="text-slate-500">Sin celular</span>
                                                    )}
                                                </div>
                                                
                                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                                    <FiCalendar className="w-3 h-3 text-blue-500" />
                                                    <span className="text-slate-300">Nacimiento:</span>
                                                    <span>{client.date_nacimiento}</span>
                                                </div>
                                            </div>

                                            {/* Información de ubicación */}
                                            <div className="grid grid-cols-1 gap-2">
                                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                                    <FiMapPin className="w-3 h-3 text-orange-500" />
                                                    <span className="text-slate-300">Provincia:</span>
                                                    <span className="capitalize">
                                                        {client.provincia && client.provincia !== 'undefined' ? client.provincia.toLowerCase() : 'Sin provincia'}
                                                    </span>
                                                </div>
                                                
                                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                                    <MdLocationOn className="w-3 h-3 text-purple-500" />
                                                    <span className="text-slate-300">Localidad:</span>
                                                    <span className="capitalize">
                                                        {client.localidad && client.localidad !== 'undefined' ? client.localidad.toLowerCase() : 'Sin localidad'}
                                                    </span>
                                                </div>
                                                
                                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                                    <svg className="w-3 h-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                    </svg>
                                                    <span className="text-slate-300">Dirección:</span>
                                                    <span className="capitalize">
                                                        {client.direccion && client.direccion !== 'undefined' ? client.direccion.toLowerCase() : 'Sin dirección'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <CardNoData type="clients" />
                )}

            {modal && client !== null && (
                <Modal isOpen={true} onClose={closeModal}>
                    <ModalEditClient success={closeModalSuccess} body={client} onClose={closeModal} />
                </Modal>
            )}
            {modalConfirm && modalConfirm.state && modalConfirm.id !== 0 && (
                <Modal isOpen={true} onClose={closeModalDelete}>
                    <ModalConfirm text=" Esta acción es irreversible y no se puede deshacer" onClose={closeModalDelete} onCloseOk={() => deleteClient(modalConfirm.id)} />
                </Modal>
            )}
        </div>
    )
}


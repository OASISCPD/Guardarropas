import { LuLock } from "react-icons/lu"
import { ScrollContainer } from "../logic/ScrollContainer"
import { BsUpcScan } from "react-icons/bs"
import { FaSearch } from "react-icons/fa"
import { GetRegisterDTO } from "../../types/registers"
import { useEffect, useState } from "react"
import { getRegisterByDni, getRegisters } from "../../logic/register"
import { sendDataClient } from "../../types/client"
import { stringProccess } from "../../logic/clients"
import { LoaderRegisterMobile } from "../loaders/LoaderRegister"
import { CardNoData } from "../cards/CardNoData"
import { Modal } from "../logic/Modal"
import { typeModalHome } from "../../types/modal"
import { ModalActionHome } from "../mod/ModalActionHome"
import { MdCreditCard } from "react-icons/md"





export default function Registers() {
    const [dni, setDni] = useState<string | number>('')

    //constante que almacena los valores de la ruta traer_registros
    const [registers, setRegisters] = useState<GetRegisterDTO[]>()
    //loading
    const [loading, setLoading] = useState<boolean>(false)
    //variable que maneja el tiempo de timoeut y q no se mande hasta que se deje de tipear
    /*     const [debouncedScanValue, setDebouncedScanValue] = useState(''); */

    //modal para los 3 tipos de acciones
    const [modal, setModal] = useState<typeModalHome>()
    async function getData() {
        setLoading(true)
        try {
            const data = await getRegisters();
            if (!data) {
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
    async function getByDni(dni: string | number) {
        setLoading(true)
        try {
            const data = await getRegisterByDni(dni);
            if (!data) {
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

    function handleScanChange(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target.value)
        //llamamos a la funcion que retorna el value de la cadena del dni 
        const data: sendDataClient | null = stringProccess(e.target.value)
        if (!data) {
            setDni('')
            return
        }
        setDni(data.dni)
        console.log(data)
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const trimmedValue = e.target.value.trim(); // Elimina espacios innecesarios
        console.log('DNI CAMPO DEL INPUT:', trimmedValue);
        // Actualiza siempre el estado, incluso si está vacío
        setDni(trimmedValue);

        // Opcional: Mensaje para depuración
        if (trimmedValue === "") {
            console.log("DNI VACÍO desde el padre.");
            setDni('')
        }
    }

    function openModal(data: typeModalHome) {
        setModal({ action: data.action, id: data.id, state: data.state })
    }
    function closeModal() {
        setModal({ action: '', id: 0, state: false })
    }
    function onSuccessClose() {
        setModal({ action: '', id: 0, state: false })
        getData()
    }

    useEffect(() => {
        setLoading(true)
        console.log('dni casmbio de valores:', dni)
        const timer = setTimeout(() => {
            const trimmed = dni.toString().trim();
            if (trimmed === "") {
                console.log("DNI vacío desde el padre recibido en el hijo.");
                getData()
            }
            else {
                console.log("DNI válido, llamando getByDni()");
                getByDni(trimmed);
            }
            /*   if (!dni || dni.toString().trim() === "") {
                  console.log("DNI vacío desde el padre recibido en el hijo.");
                  getData()
                  return
              } */
            // Si el valor de `dni` está vacío, actualiza `debouncedScanValue` para reflejarlo
            /* setDebouncedScanValue(trimmed) */
        }, 1000)

        return () => {
            clearTimeout(timer)
        }
    }, [dni])

    return (
        <div className="mt-4  text-xs sm:text-sm">
            {/* Header */}
            <header className=" p-4">
                <div className="flex items-center gap-2 text-white mb-4">
                    <LuLock size={16} className=" text-colorOrange" />
                    <h1 className="text-sm lg:text-base tracking-widest">REGISTROS</h1>
                </div>
                <div className="flex justify-between lg:justify-start gap-2 my-3 text-sm">

                    <div className="flex relative w-full lg:w-1/4">
                        <input
                            onChange={handleScanChange}
                            type="text"
                            id="scan"
                            name="scan"
                            autoComplete="off"
                            placeholder="Escanear DNI"
                            className="w-full px-4 py-2 lg:py-1 placeholder:text-white  rounded-md flex items-center gap-2 bg-colorBlue "
                        />
                        <BsUpcScan size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white" />
                    </div>
                    <div className="flex relative w-full lg:w-1/4">
                        <input
                            onChange={handleInputChange}
                            value={dni}
                            id="dni"
                            name="dni"
                            type="text"
                            autoComplete="off"
                            placeholder="Buscar DNI"
                            className="w-full px-4 py-2 lg:py-1 rounded-md flex items-center gap-2 bg-white text-gray-900 "
                        />
                        <FaSearch size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                </div>
            </header>
            {/* Records List */}
            {/* Records List */}
            <div className="p-4 rounded-lg">
                <ScrollContainer maxHeight="450px">
                    {loading ? (
                        <LoaderRegisterMobile />
                    ) : registers && registers.length > 0 ? (
                        <>
                            {/* Vista Desktop - Tabla */}
                            <div className="hidden lg:block rounded-lg shadow-xl border border-slate-600">
                                <table className="min-w-full text-center">
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
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    Fecha y Hora
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
                                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                    </svg>
                                                    Acciones
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-slate-900 divide-y divide-slate-700">
                                        {registers.map((register) => (
                                            <tr
                                                key={register.id_registro}
                                                className="hover:bg-slate-800/50 transition-colors duration-200 group"
                                            >
                                                <td className="py-4 px-4 text-left">
                                                    <div className="flex items-center gap-2">
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-700 text-slate-200 border border-slate-600">
                                                            #{register.id_registro}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-left">
                                                    <div className="text-slate-100 font-medium text-xs">
                                                        {register.datetime_ingreso}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-left">
                                                    <div className="flex items-center gap-2">
                                                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-900/50 text-blue-200 border border-blue-700">
                                                            {register.n_documento}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-left">
                                                    <div className="text-slate-100 font-medium text-xs capitalize">
                                                        {register.apellido_nombre.toLowerCase()}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-left">
                                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-900/50 text-orange-200 border border-orange-700">
                                                        {register.lugares_ocupados}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center justify-center gap-1">
                                                        <button
                                                            onClick={() => openModal({ action: 'edit', id: register.id_registro, state: true })}
                                                            className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md bg-blue-600 hover:bg-blue-700 text-white border border-blue-500 hover:border-blue-600 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                                                            title="Editar registro"
                                                        >
                                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                            Editar
                                                        </button>
                                                        <button
                                                            onClick={() => openModal({ action: 'withdraw', id: register.id_registro, state: true })}
                                                            className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md bg-red-600 hover:bg-red-700 text-white border border-red-500 hover:border-red-600 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                                                            title="Retirar registro"
                                                        >
                                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                            </svg>
                                                            Retirar
                                                        </button>
                                                        <button
                                                            onClick={() => openModal({ action: 'forgotten', id: register.id_registro, state: true })}
                                                            className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md bg-yellow-600 hover:bg-yellow-700 text-white border border-yellow-500 hover:border-yellow-600 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                                                            title="Marcar como olvidado"
                                                        >
                                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            Olvidado
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Vista Mobile - Cards */}
                            <div className="lg:hidden space-y-4">
                                {registers.map((register) => (
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
                                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-900/50 text-orange-200 border border-orange-700">
                                                        {register.lugares_ocupados}
                                                    </span>
                                                </div>
                                                <div className="text-xs text-slate-400">
                                                    {register.datetime_ingreso}
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

                                                {/* Fecha completa en mobile */}
                                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <span>
                                                        {new Date(register.datetime_ingreso).toLocaleString('es-AR', {
                                                            weekday: 'short',
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Footer con acciones */}
                                        <div className="bg-slate-800 px-4 py-3 border-t border-slate-700">
                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    onClick={() => openModal({ action: 'edit', id: register.id_registro, state: true })}
                                                    className="flex-1 inline-flex items-center justify-center px-3 py-2 text-xs font-medium rounded-md bg-blue-600 hover:bg-blue-700 text-white border border-blue-500 hover:border-blue-600 transition-all duration-200 min-w-0"
                                                >
                                                    <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => openModal({ action: 'withdraw', id: register.id_registro, state: true })}
                                                    className="flex-1 inline-flex items-center justify-center px-3 py-2 text-xs font-medium rounded-md bg-red-600 hover:bg-red-700 text-white border border-red-500 hover:border-red-600 transition-all duration-200 min-w-0"
                                                >
                                                    <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                    </svg>
                                                    Retirar
                                                </button>
                                                <button
                                                    onClick={() => openModal({ action: 'forgotten', id: register.id_registro, state: true })}
                                                    className="w-full mt-2 inline-flex items-center justify-center px-3 py-2 text-xs font-medium rounded-md bg-yellow-600 hover:bg-yellow-700 text-white border border-yellow-500 hover:border-yellow-600 transition-all duration-200"
                                                >
                                                    <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    Marcar como Olvidado
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <CardNoData type="home" />
                    )}
                </ScrollContainer>
            </div>
            {modal && modal.state && modal.action !== '' && (
                <Modal isOpen={true} onClose={closeModal}>
                    <ModalActionHome onSuccess={onSuccessClose} action={modal.action} id={modal.id} onClose={closeModal} />
                </Modal>
            )}
        </div>
    )
}

/* 

 <h1 className="min-w-[100px]">ID</h1>
                        <h1 className="min-w-[200px]">FECHA Y HORA INGRESO</h1>
                        <h1 className="min-w-[150px]">DNI</h1>
                        <h1 className="min-w-[250px]">APELLIDO Y NOMBRE</h1>
                        <h1 className="min-w-[200px]">LUGAR</h1>
                        <h1 className="min-w-[150px]">ACCIONES</h1>
*/
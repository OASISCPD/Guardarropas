import { useEffect, useState } from "react";
import { ScrollContainer } from "../logic/ScrollContainer";
import { getClientsByDni } from "../../logic/clients";
import { Modal } from "../logic/Modal";
import { FormDataDTO, ModalForm } from "../mod/ModalForm";
import { LuLoader2 } from "react-icons/lu";
import { GetClientDTO, ScanerDTO } from "../../types/client";
import { BaseUrl } from "../../logic/api";

interface propTable {
    clickClient: (dni: number | string, lastName: string, name: string, phone: string | number, id_cliente: number, id_usuario: number) => void
    body: ScanerDTO
}

export function ClientTable({ clickClient, body }: propTable) {
    //variable que almacena la data del cliente que se va a nutrir de las funciones de este componente
    const [bodyClient, setBodyClient] = useState<FormDataDTO>()
    const [isForeign, setIsForeign] = useState<boolean>(false)
    const [clients, setClients] = useState<GetClientDTO[]>()
    const [debouncedScanValue, setDebouncedScanValue] = useState<string | number>('');//variable que maneja el tiempo de timoeut y q no se mande hasta que se deje de tipear
    //booleano que habilita el formulario
    const [modalForm, setModalForm] = useState<boolean>(false)
    //loading
    const [loading, setLoading] = useState<boolean>(false)
    //loading que maneja el fetch de la busqueda de datos mediante el dni
    const [loadingFetch, setLoadingFetch] = useState<boolean>(false)
    async function getDataByDni(dni: number | string) {
        console.log('dni a mandar al fetch para ver que printear-------->', dni)
        /* setLoading(false) */
        const data = await getClientsByDni(dni);
        console.log(data)
        setClients(data)
        setLoading(false)
    }

    // Llamada a la función cada vez que el valor "debouncedScanValue" cambia
    useEffect(() => {
        if (debouncedScanValue) {
            getDataByDni(body.n_documento);
        }
    }, [debouncedScanValue]);

    //funcion on Success que me agrega el cliente recientemente cargado desde la base de datos
    function onSuccessRegister(dni: number | string, lastName: string, name: string, phone: string | number, id_cliente: number, id_usuario: number) {
        setModalForm(false)
        clickClient(dni, lastName, name, phone, id_cliente, id_usuario)
    }

    //funcion inizializa la busqueda de datos mediante el dni
    async function getValuesByDni() {
        setLoadingFetch(true)
        console.log('Buscando datos de ', body)

        try {
            const response = await fetch(`${BaseUrl}/traer_datos_nosis?dni=${body.n_documento}`, { credentials: 'include' as RequestCredentials })
            if (!response.ok) {
                //contemplar q no pudo obtener por alguna razon y completar con lo del scaner
                await autoCompleteByScaner()
                return
            }
            const data = await response.json()
            // Verificar si el objeto data está vacío
            const isDataEmpty = Object.keys(data).length === 0;
            if (isDataEmpty) {
                //contemplar q no pudo obtener por alguna razon y completar con lo del scaner
                await autoCompleteByScaner()
                return
            }

            setBodyClient({ n_documento: body.n_documento, nombre: data.VI_Nombre, apellido: data.VI_Apellido, fecha_nacimiento: data.VI_FecNacimiento, genero: data.VI_Sexo, celular: '', tipo_documento: "DNI", direccion: (data.VI_DomAF_Calle + ' ' + data.VI_DomAF_Nro), localidad: data.VI_DomAF_Loc, provincia: data.VI_DomAF_Prov })
            setModalForm(true)
            return
        } catch (error) {
            console.error(error)
            //contemplar q no pudo obtener por alguna razon y completar con lo del scaner
            await autoCompleteByScaner()
            return
        } finally {
            setLoadingFetch(false)
        }
    }

    //funcion que autocompleta con los valores crudos del scanner
    async function autoCompleteByScaner() {
        await setBodyClient({ n_documento: body.n_documento, nombre: body.nombre, apellido: body.apellido, fecha_nacimiento: body.fecha_nacimiento, genero: body.genero, celular: '', tipo_documento: "DNI", direccion: '', localidad: '', provincia: '' })
        setModalForm(true)

    }

    function closeForm() {
        setModalForm(false)
    }
    // Este useEffect gestiona el debounce
    useEffect(() => {
        setLoading(true)
        const timer = setTimeout(() => {
            setDebouncedScanValue(body.n_documento);
        }, 1000);

        // Limpiar el timeout cuando el valor cambie antes de los 1000ms
        return () => {
            clearTimeout(timer);
        };
    }, [body.n_documento]);

    useEffect(() => {
        console.log('actualizacion del body: ', bodyClient)

    }, [bodyClient])

    return (
        <>
            <div className="z-20 text-xs lg:absolute lg:top-8 w-full rounded-lg shadow-2xl border border-slate-600 bg-slate-800/95 backdrop-blur-sm">
                {loading ? (
                    <ScrollContainer maxHeight="400px">
                        {/* Loading State */}
                        <div className="overflow-hidden rounded-lg">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-slate-900 text-center">
                                        <th className="py-3 px-4 text-slate-200 font-medium text-sm border-b border-slate-700">Nombre</th>
                                        <th className="py-3 px-4 text-slate-200 font-medium text-sm border-b border-slate-700">DNI</th>
                                        <th className="py-3 px-4 text-slate-200 font-medium text-sm border-b border-slate-700">Teléfono</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...Array(8)].map((_, index) => (
                                        <tr key={index} className="bg-slate-800 border-b border-slate-700">
                                            <td className="py-3 px-4">
                                                <div className="h-4 bg-slate-600 rounded animate-pulse"></div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="h-4 bg-slate-600 rounded animate-pulse"></div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="h-4 bg-slate-600 rounded animate-pulse"></div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ScrollContainer>
                ) : (
                    clients && clients.length > 0 ? (
                        <ScrollContainer maxHeight="400px">
                            <div className=" rounded-lg">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-slate-900 text-center">
                                            <th className="py-3 px-4 text-slate-200 font-medium text-sm border-b border-slate-700">Nombre</th>
                                            <th className="py-3 px-4 text-slate-200 font-medium text-sm border-b border-slate-700">DNI</th>
                                            <th className="py-3 px-4 text-slate-200 font-medium text-sm border-b border-slate-700">Teléfono</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clients?.map((client, index) => (
                                            <tr
                                                onClick={() => clickClient(client.n_documento, client.apellido, client.nombre, client.celular, client.id_cliente, client.id_usuario)}
                                                key={index}
                                                className="bg-slate-800 border-b border-slate-700 cursor-pointer hover:bg-slate-700 transition-colors duration-200 group"
                                            >
                                                <td className="py-3 px-4 text-slate-200 group-hover:text-slate-100">
                                                    <span className="font-medium">{client.apellido}</span>, <span className="text-slate-300">{client.nombre}</span>
                                                </td>
                                                <td className="py-3 px-4 text-slate-200 group-hover:text-slate-100">
                                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-900/50 text-blue-200 border border-blue-700">
                                                        {client.n_documento}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-slate-200 group-hover:text-slate-100">
                                                    {client.celular ? (
                                                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-900/50 text-green-200 border border-green-700">
                                                            {client.celular}
                                                        </span>
                                                    ) : (
                                                        <span className="text-slate-500 italic">Sin teléfono</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </ScrollContainer>
                    ) : (
                        <div className="rounded-lg overflow-hidden bg-slate-800">
                            <ScrollContainer maxHeight="400px">
                                {/* Header - DNI no encontrado */}
                                <div className="bg-slate-900 px-4 py-3 border-b border-slate-700">
                                    <div className="flex flex-col lg:flex-row items-center justify-center gap-2">
                                        <span className="text-slate-300 text-sm">DNI no encontrado:</span>
                                        <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-red-900/50 text-red-200 border border-red-700">
                                            {body.n_documento}
                                        </span>
                                    </div>
                                </div>

                                {/* Content - Agregar cliente */}
                                <div className="p-6">
                                    <div className="flex flex-col lg:flex-row 2xl:flex-row items-center justify-center gap-6">
                                        {/* Botón Agregar Cliente */}
                                        <button
                                            disabled={loadingFetch}
                                            onClick={getValuesByDni}
                                            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg ${!loadingFetch
                                                    ? 'bg-colorOrange hover:bg-orange-600 text-white border border-orange-500'
                                                    : 'bg-slate-600 text-slate-300 border border-slate-500 cursor-not-allowed'
                                                }`}
                                        >
                                            {!loadingFetch ? (
                                                <>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    Agregar Cliente
                                                </>
                                            ) : (
                                                <>
                                                    <LuLoader2 size={16} className="animate-spin" />
                                                    Cargando...
                                                </>
                                            )}
                                        </button>

                                        {/* Toggle Extranjero */}
                                        <div className="flex flex-col items-center gap-2">
                                            <label className="text-sm font-medium text-slate-300">¿Es Extranjero?</label>
                                            <div className="flex items-center gap-3">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={isForeign}
                                                        onChange={() => setIsForeign(!isForeign)}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-12 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-colorOrange rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:border-slate-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-colorOrange"></div>
                                                </label>
                                                <span className="text-sm font-medium text-slate-300">
                                                    {isForeign ? 'Sí' : 'No'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollContainer>
                        </div>
                    )
                )}
            </div>
            {modalForm && bodyClient && (
                <Modal isOpen={true} onClose={closeForm}>
                    <ModalForm onSuccess={onSuccessRegister} body={bodyClient} onClose={closeForm} />
                </Modal>
            )}
        </>
    );
}


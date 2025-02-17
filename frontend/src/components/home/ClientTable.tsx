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
            const response = await fetch(`${BaseUrl}/traer_datos_nosis2?dni=${body.n_documento}`, { credentials: 'include' as RequestCredentials })
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
            <ul className={`z-20 text-xs lg:absolute lg:top-8 w-full text-black  rounded-md shadow-2xl`}>
                {loading ? (
                    <ScrollContainer maxHeight="400px">
                        {/* Simulación de tabla cargando */}
                        <table className="w-full border-collapse lg:border border-colorBlue max-w-xl mx-auto">
                            <thead>
                                <tr className="bg-slate-800 text-center text-white">
                                    <td className="py-2 px-2 border">Nombre</td>
                                    <td className="py-2 px-2 border">DNI</td>
                                    <td className="py-2 px-2 border">Telefono</td>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Fila de carga */}
                                {[...Array(8)].map((_, index) => (
                                    <tr key={index} className="bg-zinc-100 text-center border-b animate-pulse">
                                        <td className="py-2 border px-4 bg-gray-400">...</td>
                                        <td className="py-2 border px-4 bg-gray-400">...</td>
                                        <td className="py-2 border px-4 bg-gray-400">...</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </ScrollContainer>
                ) : (
                    clients && clients.length > 0 ? (
                        <ScrollContainer maxHeight="400px">
                            < table className="w-full border-collapse lg:border border-colorBlue  lg:max-w-full mx-auto ">
                                <thead>
                                    <tr className="bg-slate-800 text-center text-white">
                                        <td className="py-2 px-2 border">Nombre</td>
                                        <td className="py-2 px-2 border">DNI</td>
                                        <td className="py-2 px-2 border">Telefono</td>
                                    </tr >
                                </thead >
                                <tbody>
                                    {clients?.map((client, index) => (
                                        <tr onClick={() => clickClient(client.n_documento, client.apellido, client.nombre, client.celular, client.id_cliente, client.id_usuario)}
                                            key={index}
                                            className="bg-zinc-100 border-b cursor-pointer border-blue-500 hover:bg-zinc-200"
                                        >
                                            <td className="py-2 border px-4">
                                                {client.apellido}, {client.nombre}
                                            </td>
                                            <td className="py-2 border px-4">{client.n_documento}</td>
                                            <td className="py-2 border px-4">{client.celular ? client.celular : <h1 className="text-colorRed">{'-----------'}</h1>}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table >
                        </ScrollContainer >
                    ) : (
                        <div className="w-full overflow-x-auto border border-blue-600 rounded-md shadow-xl bg-white">
                            <table className="w-full ">
                                <ScrollContainer maxHeight="400px">
                                    <div className="bg-slate-800 text-white">
                                        <h1 className="py-2 px-4 flex justify-center items-center lg:flex-col 2xl:flex-row ">DNI no encontrado: <span className="border-2 p-1 mx-2 border-colorMsjYellow text-colorRed"> {body.n_documento}</span></h1>
                                    </div>
                                    <div className="flex lg:flex-col 2xl:flex-row  items-center h-24 justify-center gap-4">
                                        <button
                                            disabled={loadingFetch}
                                            onClick={getValuesByDni}
                                            className={`${!loadingFetch ? 'bg-colorBlue' : 'bg-colorGray'} text-white p-2  rounded-md lg:mt-8 2xl:mt-4  cursor-pointer hover:scale-105 duration-300 px-4 py-2 my-4   hover:text-white shadow-2xl mx-auto`}
                                        >
                                            {!loadingFetch ? <h1>Agregar Cliente</h1> : <h1 className="flex items-center">Cargando <span className="animate-spin ml-4 duration-100"><LuLoader2 size={20} /></span>
                                            </h1>}
                                        </button>
                                        <div className="mx-auto">
                                            <label className="col-span-full mt-4" htmlFor="">¿Es Extranjero?</label>
                                            <div className="flex items-center justify-start">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={isForeign}
                                                        onChange={() => setIsForeign(!isForeign)}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-12 h-6 sm:w-14 sm:h-8 bg-gray-300 peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-5 sm:peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 sm:after:h-7 after:w-5 sm:after:w-7 after:transition-all peer-checked:bg-blue-600"></div>
                                                    <span className="ml-2   text-gray-900">
                                                        {isForeign ? 'Si' : 'No'}
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollContainer>
                            </table>
                        </div>
                    )
                )
                }
            </ul >
            {modalForm && bodyClient && (
                <Modal isOpen={true} onClose={closeForm}>
                    <ModalForm onSuccess={onSuccessRegister} body={bodyClient} onClose={closeForm} />
                </Modal>
            )}
        </>
    );
}


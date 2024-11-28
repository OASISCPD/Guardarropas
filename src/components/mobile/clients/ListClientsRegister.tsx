import { useEffect, useState } from "react";
import { GetClientDTO, getClientRegister, getClientsByDni } from "../../../logic/clients";
import { TbUserEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { LuLoader2 } from "react-icons/lu";
import { LoaderRegisterMobile } from "../../loaders/LoaderRegister";

interface propList {
    dni: string | number
}
export function ListClientsRegister({ dni }: propList) {
    //constante que maneja el loading en el componente para mostrar un loading
    const [loading, setLoading] = useState<boolean>(false)
    //clients
    const [clients, setClients] = useState<GetClientDTO[]>()
    //constante que habilita el modal para ver los movimientos segun el id
    const [debouncedScanValue, setDebouncedScanValue] = useState('');//variable que maneja el tiempo de timoeut y q no se mande hasta que se deje de tipear

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
            <div style={{ maxHeight: '600px', overflowY: 'auto', overflowX: 'auto' }} className="shadow-2xl shadow-stone-800 rounded-md">
                {loading ? (
                    <LoaderRegisterMobile />
                ) :
                    clients && clients.length > 0 ? (
                        <table className="min-w-full text-center">
                            <thead>
                                <tr className="uppercase text-xs">
                                    <td className="py-4 px-4 whitespace-nowrap">ID</td>
                                    <td className="py-4 px-4 whitespace-nowrap">DNI</td>
                                    <td className="py-2 px-4">tipo de documento</td>
                                    <td className="py-4 px-4 whitespace-nowrap">Apellido y Nombre</td>
                                    <td className="py-4 px-4 whitespace-nowrap">celular</td>
                                    <td className="py-4 px-4 whitespace-nowrap">Fecha de nacimiento</td>
                                    <td className="py-4 px-4 whitespace-nowrap">Genero</td>
                                    <td className="py-4 px-4 whitespace-nowrap">provincia</td>
                                    <td className="py-4 px-4 whitespace-nowrap">localidad</td>
                                    <td className="py-4 px-4 whitespace-nowrap">direccion</td>
                                    <td className="py-4 px-4 whitespace-nowrap">editar</td>
                                    <td className="py-4 px-4 whitespace-nowrap">eliminar</td>
                                </tr>
                            </thead>
                            <tbody className="bg-colorGray rounded-md text-xs uppercase">
                                {clients.map((client) => (
                                    <tr key={client.id_cliente}>
                                        <td className="py-2 px-4">{client.id_cliente}</td>
                                        <td className="py-2 px-4">{client.n_documento}</td>
                                        <td className="py-2 px-4">
                                            {client.tipo_documento ? client.tipo_documento : 'No se hay tipo de documento asociado'}
                                        </td>
                                        <td className="py-2 px-4">{client.apellido + ' ' + client.nombre}</td>
                                        <td className="py-2 px-4">
                                            {client.celular ? client.celular : <h1 className="text-colorYellow">No hay celular asociado</h1>}
                                        </td>
                                        <td className="py-2 px-4">
                                            {client.date_nacimiento}
                                        </td>
                                        <td className="py-2 px-4">
                                            {client.genero}
                                        </td>
                                        <td className="py-2 px-4">
                                            {client.provincia && client.provincia !== undefined && client.provincia.toLowerCase() !== 'undefined' ? client.provincia : <h1 className="text-colorYellow">No hay provincia asociada</h1>}
                                        </td>
                                        <td className="py-2 px-4">
                                            {client.localidad && client.localidad !== undefined && client.localidad.toLowerCase() !== 'undefined' ? client.localidad : <h1 className="text-colorYellow">No hay localidad asociada</h1>}
                                        </td>
                                        <td className="py-2 px-4">
                                            {client.direccion && client.direccion !== undefined && client.direccion.toLowerCase() !== 'undefined' ? client.direccion : <h1 className="text-colorYellow">No hay direccion asociada</h1>}
                                        </td>
                                        <td className="py-2 px-4 text-colorBlue">

                                            <TbUserEdit onClick={() => console.log('')} size={25} className=' mx-auto' />
                                        </td>
                                        <td className="py-2 px-4 text-colorRed">
                                            <MdDelete onClick={() => console.log('')} size={25} className=' mx-auto' />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-8 text-center text-white uppercase shadow-sm shadow-colorWhiteShadow border bg-colorGray rounded-md">
                            <h1>No hay datos</h1>
                        </div>
                    )}
            </div>
        </div>
    )
}

/* DTO PARA EL ENVIO DEL UPDATE

id_cliente: 53
n_documento: 44392765
tipo_documento: Pasaporte
nombre: FLORENCIA MAGALI
apellido: CEPEDA
celular: 1126445577
fecha_nacimiento: 2002-09-12
genero: F
provincia: Buenos Aires
localidad: LAFERRERE
direccion: TEUCO 3900
*/
import { useEffect, useState } from "react";
import { deleteClientById, getClientRegister, getClientsByDni } from "../../logic/clients";
import { TbUserEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
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
                    <ScrollContainer maxHeight="400px">
                        <table className=" min-w-full text-center">
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

                                            <TbUserEdit onClick={() => openModal(client)} size={25} className=' mx-auto' />
                                        </td>
                                        <td className="py-2 px-4 text-colorRed">
                                            <MdDelete onClick={() => openModalDelete(client.id_cliente)} size={25} className=' mx-auto' />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </ScrollContainer>
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


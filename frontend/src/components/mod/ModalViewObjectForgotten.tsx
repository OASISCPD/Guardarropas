import { IoMdClose } from "react-icons/io";
import { ScrollContainer } from "../logic/ScrollContainer";
import { useEffect, useState } from "react";
import { getRegisterObjectForgottenById } from "../../logic/register";
import { GetRegisterByIdRegisterDTO } from "../../types/registers";
import { ModalLoadingTemplate } from "../news/CardLoading";
import { getTextColorForStateForgotten } from "../../logic/colors";
import { typeModalGarmentChangedState } from "../../types/modal";
import { Modal } from "../logic/Modal";
import { ModalChangedStateGarment } from "./ModalChangedStateGarment";

export interface FormDataDTO {
    prenda: string
}

export interface propForm {
    id: number
    onClose: () => void
}

/* traer_registro_x_id?id_registro=1771 */
export function ModalViewObjectForgotten({ onClose, id }: propForm) {
    //modal que permite cambiar el estado de las prendas una por una 
    const [modal, setModal] = useState<typeModalGarmentChangedState>()
    //el loading se inizializa en false para que cargue siempre le modal primero caregando y despues printee la data
    const [loading, setLoading] = useState<boolean>(false)
    //constante q2ue almacena los valores a mostrar
    const [client, setClient] = useState<GetRegisterByIdRegisterDTO>()
    //function que me trae la data del registro en particular
    async function getData() {
        setLoading(true)
        const data = await getRegisterObjectForgottenById(id);
        console.log(data)
        if (!data) {
            console.log('no hay datos')
            return
        }
        setClient(data)
        setLoading(false)
    }

    //function que habilita el modal para pasar por unica prena el estado
    function openModal(id_garment: number) {
        setModal({ id_garment: id_garment, state: true, id_register: id })
    }
    //funcion que cierra el modal
    function closeModal() {
        setModal({ id_garment: 0, state: false, id_register: 0 })
    }

    //use effect iniizaliza la funcion que me trae el movimiento del registro de ese id
    useEffect(() => {
        getData()
    }, [])

    return (
        <section className="fixed top-0 left-0 w-full h-full flex items-center justify-center  z-500">
            <div className="rounded-xl shadow-xl max-w-md w-full mx-4 md:mx-auto ">
                {loading ? (
                    <div className=" bg-colorGray  rounded-md shadow min-h-60 ">
                        <div className="flex items-center justify-between p-4">
                            <h3 className="text-xl strokeWidth text-gray-900"></h3>
                            <button className="text-white bg-transparent  hover:text-gray-900 rounded-md text-sm h-8 w-8 ms-auto inline-flex justify-center items-center " onClick={onClose}>
                                <IoMdClose size={40} />
                            </button>
                        </div>
                        <ModalLoadingTemplate />
                    </div>
                ) : (
                    <div className=" bg-colorGray  rounded-md shadow min-h-60 ">

                        <div className="flex items-center justify-between p-4">
                            <h3 className="text-xl strokeWidth text-gray-900"></h3>
                            <button className="text-white bg-transparent  hover:text-gray-900 rounded-md text-sm h-8 w-8 ms-auto inline-flex justify-center items-center " onClick={onClose}>
                                <IoMdClose size={40} />
                            </button>
                        </div>
                        <div className="p-4">
                            <div className="text-white text-xs uppercase" >
                                <ScrollContainer maxHeight="800px">
                                    {client ? (
                                        <div className="p-2 text-start">
                                            <h1 className="my-1 text-sm">Cliente: <span className=""> {client.apellido + ' ' + client.nombre}</span></h1>
                                            <h1 className="my-1 text-sm">DNI: <span className="text-colorMsjYellow">{client.n_documento}</span></h1>
                                            <div className="mt-2 text-xs">
                                                <ScrollContainer maxHeight="300px">
                                                    {client.prendas.map((garment, index) => (
                                                        <div className="p-2 my-2 border border-colorWhiteShadow  rounded-sm " key={index}>
                                                            <h1 className="my-1 text-colorYellow">{garment.tipo} N°{garment.numero}</h1>
                                                            <h1 className="my-1">OBJ: {garment.prenda}</h1>
                                                            <h1 className={`my-1 `}>ESTADO: <span className={`${getTextColorForStateForgotten(garment.estado_prenda)}`}>{garment.estado_prenda}</span></h1>
                                                            <h1 className="my-1">DETALLE: {garment.detalle ? garment.detalle : 'No hay Detalles en esta prenda'}</h1>
                                                            {garment.estado_prenda === 'OLVIDADO' && (
                                                                <button onClick={() => openModal(garment.id_prenda_olvidada)} className="bg-colorBlue my-3 w-1/2 flex justify-center items-center text-center py-2 rounded-md mx-auto text-white shadow-xl hover:scale-105 duration-100">EDITAR</button>
                                                            )}
                                                        </div>
                                                    ))}
                                                </ScrollContainer>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-8 bg-colorWhiteShadow bg-opacity-40">
                                            <h1 className="text-center text-black">No Hay Datos</h1>
                                        </div>
                                    )}

                                </ScrollContainer>

                            </div>
                        </div>
                    </div>
                )}
            </div>
            {modal && modal.state && (
                <Modal isOpen={true} onClose={closeModal}>
                    <ModalChangedStateGarment id_garment={modal.id_garment} id_register={modal.id_register} onClose={closeModal} success={() => { closeModal(), getData() }} />
                </Modal>
            )}
        </section>
    )
}   
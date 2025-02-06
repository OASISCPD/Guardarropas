import { useEffect, useState } from "react";
import { LoaderRegisterHoverMobile } from "../loaders/LoaderRegister";
import { IoMdClose } from "react-icons/io";
import { ChangedValueOfObjectLost } from "../../logic/objects";
import { toast } from "react-toastify";
import { Modal } from "../logic/Modal";
import { ModalAddClientObjectLost } from "./ModalAddClientObjectLost";

interface propModal {
    onClose: () => void
    id: number
    success: () => void
    state: string
}

export function ModalChangedStateObjectLost({ onClose, success, id, state }: propModal) {
    ///loading al mandar el mensaje al fetch
    const [loading, setLoading] = useState<boolean>(false)
    //valor del select
    const [typeState, setTypeState] = useState<string>('')
    //modal para trackear al cliente en caso que quiera retirar el objeto/prenda perdida
    const [modal, setModal] = useState<boolean>(false)
    async function onSubmit() {
        setLoading(true)
        console.log(typeState)
        if (!typeState) {
            console.log('no tiene el valor esperado')
            return
        }
        if (typeState.toUpperCase() === "RETIRADO") {
            setLoading(false)
            //habilitar modal para el trackeo de las personas
            openModal()
            return
        }
        try {
            const res = await ChangedValueOfObjectLost(id, typeState);
            if (res && !res.ok) {
                console.log('error en el fetch aplicar toast')
                return
            }
            /* console.log(res) */
            toast.success('Estado actualizado correctamente')
            success()
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    function openModal() {
        setModal(true)
    }
    function closeModal() {
        setModal(false)
    }

    useEffect(() => {
        console.log('tipo', typeState)
    }, [typeState])

    return (
        <section className="fixed top-0 left-0 w-full h-full flex items-center justify-center  z-50">
            <div className="rounded-xl shadow-xl max-w-md w-full mx-4 md:mx-auto ">
                <div className=" bg-colorGray  rounded-md shadow min-h-60 ">
                    {loading && (
                        <LoaderRegisterHoverMobile />
                    )}
                    <div className="flex items-center justify-between p-4">
                        <button className="text-white bg-transparent   rounded-md text-sm h-8 w-8 ms-auto inline-flex justify-center items-center " onClick={onClose}>
                            <IoMdClose size={40} />
                        </button>
                    </div>
                    <h3 className="text-base uppercase strokeWidth text-center text-white ">Actualizar Estado</h3>
                    <div className="my-2">
                        <h3 className=" uppercase strokeWidth text-center text-white text-base">Registro N° {id}</h3>
                        <div className="flex justify-center my-4 items-center">
                            <h1 className="uppercase">Estado:</h1>
                            <select
                                className="px-4 uppercase text-black rounded-sm mx-2 py-1"
                                onChange={(e) => setTypeState(e.target.value)}
                            >
                                <option value="" disabled selected>Seleccionar una Opcion</option>
                                {state.toUpperCase() !== 'EN DONACION' && (
                                    <option value="EN DONACION">En donacion</option>
                                )}
                                <option value="DONADO">Donado</option>
                                <option value="RETIRADO">Retirado</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-2 flex items-center ">
                        <button disabled={!typeState} onClick={onSubmit} className={`${!typeState ? 'bg-colorBlue/80' : 'bg-colorBlue'}   mx-auto py-3  rounded-md w-1/2 `}>Guardar</button>
                    </div>
                </div>
            </div>
            {modal && (
                <Modal isOpen={true} onClose={closeModal}>
                    <ModalAddClientObjectLost id_objeto_perdido={id} onClose={closeModal} />
                </Modal>
            )}
        </section>

    )
}
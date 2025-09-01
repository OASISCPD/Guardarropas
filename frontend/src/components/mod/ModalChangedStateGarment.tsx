import { useEffect, useState } from "react";
import { LoaderRegisterHoverMobile } from "../loaders/LoaderRegister";
import { IoMdClose } from "react-icons/io";
import { ChangedValueOfGarment } from "../../logic/objects";
import { toast } from "react-toastify";

interface propModal {
    onClose: () => void
    id_garment: number
    success: () => void
    id_register: number
}

export function ModalChangedStateGarment({ onClose, success, id_garment, id_register }: propModal) {
    ///loading al mandar el mensaje al fetch
    const [loading, setLoading] = useState<boolean>(false)
    //valor del select
    const [typeState, setTypeState] = useState<string>('')
    async function onSubmit() {
        setLoading(true)
        console.log(typeState)
        if (!typeState) {
            console.log('no tiene el valor esperado')
            return
        }
        try {
            const res = await ChangedValueOfGarment(id_register, typeState, id_garment);
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



    useEffect(() => {
        console.log('tipo', typeState)
    }, [typeState])

    return (
        <section className="fixed top-0 left-0 w-full h-full flex items-center justify-center  z-50">
            <div className="rounded-xl shadow-xl max-w-md w-full mx-4 md:mx-auto ">
                <div className=" bg-colorBlueComponents  rounded-md shadow min-h-60 ">
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
                        <h3 className=" uppercase strokeWidth text-center text-white text-base">Objeto/Prenda N° {id_register}</h3>
                        <div className="flex justify-center my-4 items-center">
                            <h1 className="uppercase">Estado:</h1>
                            <select
                                className="px-4 uppercase text-black rounded-sm mx-2 py-1"
                                onChange={(e) => setTypeState(e.target.value)}
                            >
                                <option value="" disabled selected>Seleccionar una Opcion</option>
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
        </section>

    )
}
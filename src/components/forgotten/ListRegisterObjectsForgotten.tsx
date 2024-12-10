import { useEffect, useState } from "react"
import { RegisterObjectForgottenDTO } from "../../types/registers"
import { TypeModal, TypeModalObjectLost } from "../../types/modal";
import { getRegisterObjectForgottenByName } from "../../logic/register";
import { LoaderRegisterMobile } from "../loaders/LoaderRegister";
import { getTextColorForStateForgotten } from "../../logic/colors";
import { Modal } from "../logic/Modal";
import { ModalViewObjectForgotten } from "../mod/ModalViewObjectForgotten";
import { CardNoData } from "../cards/CardNoData";

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
            <div style={{ maxHeight: '600px', overflowY: 'auto', overflowX: 'auto' }} className="shadow-2xl shadow-stone-800 rounded-md">
                {loading ? (
                    <LoaderRegisterMobile />
                ) : registers && registers.length > 0 ? (
                    <table className="min-w-full text-center">
                        <thead>
                            <tr className="uppercase text-xs">
                                <td className="py-4 px-4 whitespace-nowrap">ID</td>
                                <td className="py-4 px-4 whitespace-nowrap">Cliente</td>
                                <td className="py-2 px-4">Dni</td>
                                <td className="py-4 px-4 whitespace-nowrap">Celular</td>
                                <td className="py-4 px-4 whitespace-nowrap">fecha de ingreso</td>
                                <td className="py-4 px-4 whitespace-nowrap">responsable</td>
                                <td className="py-4 px-4 whitespace-nowrap">Objeto/s Olvidado/s</td>
                                <td className="py-4 px-4 whitespace-nowrap">Estado</td>
                            </tr>
                        </thead>
                        <tbody className="bg-colorGray rounded-md text-xs uppercase">
                            {registers.map((register) => (
                                <tr key={register.id_registro_olvidado}>
                                    <td className="py-2 px-4">{register.id_registro_olvidado}</td>
                                    <td className="py-2 px-4">{register.cliente}</td>
                                    <td className="py-2 px-4">
                                        {register.n_documento}
                                    </td>
                                    <td className="py-2 px-4">
                                        {register.celular}
                                    </td>
                                    <td className="py-2 px-4">{register.datetime_olvidado}</td>
                                    <td className="py-2 px-4 ">
                                        {register.usuario}
                                    </td>
                                    <td className="py-2 px-4 text-green-500" onClick={() => openModalView(register.id_registro_olvidado)}>Ver</td>
                                    <td className="py-2 px-4">
                                        <button onClick={() => openModal(register.id_registro_olvidado, register.estado_registro)} className={`${getTextColorForStateForgotten(register.estado_registro)}  cursor-pointer `}>{register.estado_registro}</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <CardNoData type="forgotten" />
                )
                }
            </div>
            {modalView && modalView.state && (
                <Modal isOpen={true} onClose={closeModal}>
                    <ModalViewObjectForgotten onClose={closeModal} id={modalView.id} />
                </Modal>
            )}
        </div>
    )
}
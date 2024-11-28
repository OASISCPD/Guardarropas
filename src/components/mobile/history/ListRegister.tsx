import { useEffect, useState } from "react";
import { getRegisterByDniHistorical, getRegisterHistorical } from "../../../logic/register";
import { LuLoader2 } from "react-icons/lu";
import { TypeModal } from "../../../types/modal";
import { Modal } from "../../logic/Modal";
import { ModalMovementRegister } from "../../mod/ModalMovementRegister";
import { RegisterHistoricalDTO } from "../../../types/registers";

interface propList {
    dni: string | number
}

export function ListRegister({ dni }: propList) {
    //constante que almacena los registros
    const [registers, setRegisters] = useState<RegisterHistoricalDTO[]>()
    //constante que maneja el loading en el componente para mostrar un loading
    const [loading, setLoading] = useState<boolean>(false)
    //constante que habilita el modal para ver los movimientos segun el id
    const [modal, setModal] = useState<TypeModal>()
    const [debouncedScanValue, setDebouncedScanValue] = useState('');//variable que maneja el tiempo de timoeut y q no se mande hasta que se deje de tipear

    async function getData() {
        setLoading(true)
        const data = await getRegisterHistorical();
        if (!data) {
            console.log('no hay datos')
            return
        }
        setRegisters(data)
        setLoading(false)
    }

    function openModal(id: number) {
        setModal({ id: id, state: true })
    }

    function closeModal() {
        setModal({ id: 0, state: false })
    }

    //funcion que busca en los registros por el dni
    async function getDataByDni() {

        try {
            const data = await getRegisterByDniHistorical(dni)
            if (!data) {
                return
            }
            setRegisters(data)
            setLoading(false)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])


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
                {registers && registers.length > 0 ? (
                    <table className="min-w-full text-center">
                        <thead>
                            <tr className="uppercase text-sm">
                                <th className="py-4 px-4 whitespace-nowrap">ID</th>
                                <th className="py-4 px-4 whitespace-nowrap">Fecha y Hora Ingreso</th>
                                <th className="py-2 px-4">Fecha y Hora Egreso</th>
                                <th className="py-4 px-4 whitespace-nowrap">DNI</th>
                                <th className="py-4 px-4 whitespace-nowrap">Apellido y Nombre</th>
                                <th className="py-4 px-4 whitespace-nowrap">Lugar</th>
                                <th className="py-4 px-4 whitespace-nowrap"></th>
                            </tr>
                        </thead>
                        {loading ? (
                            <tbody className="bg-colorWhiteShadow bg-opacity-50 rounded-md mx-auto animate-pulse text-xs uppercase">
                                {[...Array(10)].map((_, i) => (
                                    <tr >
                                        <td className="py-2 px-4 "> <LuLoader2 size={20} className="animate-spin mx-auto" /></td>
                                        <td className="py-2 px-4 "> <LuLoader2 size={20} className="animate-spin mx-auto" /></td>
                                        <td className="py-2 px-4 ">
                                            <LuLoader2 size={20} className="animate-spin mx-auto" />
                                        </td>
                                        <td className="py-2 px-4 "> <LuLoader2 size={20} className="animate-spin mx-auto" /></td>
                                        <td className="py-2 px-4 "> <LuLoader2 size={20} className="animate-spin mx-auto" /></td>
                                        <td className="py-2 px-4 ">
                                            <LuLoader2 size={20} className="animate-spin mx-auto" />
                                        </td>
                                        <td className="py-2 px-4  text-green-600">
                                            <LuLoader2 size={20} className="animate-spin mx-auto" />
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        ) : (

                            <tbody className="bg-colorGray rounded-md text-xs uppercase">
                                {registers.map((register) => (
                                    <tr key={register.id_registro}>
                                        <td className="py-2 px-4">{register.id_registro}</td>
                                        <td className="py-2 px-4">{register.datetime_ingreso}</td>
                                        <td className="py-2 px-4">
                                            {register.datetime_egreso ? register.datetime_egreso : 'Todavia no ha sido retirado'}
                                        </td>
                                        <td className="py-2 px-4">{register.n_documento}</td>
                                        <td className="py-2 px-4">{register.apellido_nombre}</td>
                                        <td className="py-2 px-4">
                                            {register.lugares_ocupados ? register.lugares_ocupados : <h1 className="text-colorYellow">{'------>'}</h1>}
                                        </td>
                                        <td className="py-2 px-4 text-green-600">
                                            <button onClick={() => openModal(register.id_registro)} className="cursor-pointer hover:text-green-400">Ver movimiento</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                ) : (
                    <div className="p-8 text-center text-white uppercase shadow-sm shadow-colorWhiteShadow border bg-colorGray rounded-md">
                        <h1>No hay datos</h1>
                    </div>
                )}
            </div>
            {modal && modal.state && (
                <Modal isOpen={true} onClose={closeModal}>
                    <ModalMovementRegister id={modal.id} onClose={closeModal} />
                </Modal>
            )}
        </div >
    )
}
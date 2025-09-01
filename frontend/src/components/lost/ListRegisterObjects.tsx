import { useEffect, useState } from "react";
import { RegisterObjectLostDTO } from "../../types/registers";
import { TypeModalObjectLost } from "../../types/modal";
import { getRegisterObjectLostByName } from "../../logic/register";
import { LoaderRegisterMobile } from "../loaders/LoaderRegister";
import { Modal } from "../logic/Modal";
import { getTextColorForState } from "../../logic/colors";
import { ModalChangedStateObjectLost } from "../mod/ModalChangedStateObjectLost";
import { CardNoData } from "../cards/CardNoData";
import { BiPrinter, BiImageAlt } from "react-icons/bi";

interface propList {
    name: string
    state: boolean
}


export function ListRegisterObjects({ name, state }: propList) {
    //constante que almacena los registros
    const [registers, setRegisters] = useState<RegisterObjectLostDTO[]>()
    //constante que maneja el loading en el componente para mostrar un loading
    const [loading, setLoading] = useState<boolean>(false)
    //constante que habilita el modal para ver los movimientos segun el id
    const [modal, setModal] = useState<TypeModalObjectLost>()
    const [debouncedScanValue, setDebouncedScanValue] = useState('');//variable que maneja el tiempo de timoeut y q no se mande hasta que se deje de tipear


    async function getData(value: string) {
        setLoading(true)
        try {
            const data = await getRegisterObjectLostByName(state, value);
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

    const handlePrint = (register: RegisterObjectLostDTO) => {
        sessionStorage.setItem("lostObjectToPrint", JSON.stringify(register));
        window.open("/printTicketLost", "_blank");
    };

    const handleViewImage = (register: RegisterObjectLostDTO) => {
        // Aquí puedes implementar la lógica para mostrar la imagen
        // Por ahora, abrimos una nueva ventana con la imagen si existe
        if (register.imagen_url) {
            window.open(register.imagen_url, "_blank");
        } else {
            alert("No hay imagen asociada a este objeto");
        }
    };

    useEffect(() => {
        if (name.toString() === '') {
            return
        }
        // Llama a la función siempre que `debouncedScanValue` cambie
        getData(name)
    }, [debouncedScanValue]);

    function openModal(id: number, state: string) {
        if (state.toUpperCase() === "RETIRADO" || state.toUpperCase() === "DONADO") {
            console.log('ya fue pasado a inactivo')
            return
        }
        setModal({ id: id, state: true, stateObject: state })
    }

    function closeModal() {
        setModal({ id: 0, state: false, stateObject: '' })
    }


    useEffect(() => {
        setLoading(true)
        const timer = setTimeout(() => {
            if (!name || name.toString().trim() === "") {
                console.log("name vacío desde el padre recibido en el hijo.");
                getData(name)
                return
            }
            // Si el valor de `name` está vacío, actualiza `debouncedScanValue` para reflejarlo
            setDebouncedScanValue(name.toString())
        }, 1000)

        return () => {
            clearTimeout(timer)
        }
    }, [name, state])
    return (
        <div className="py-8">
            <div style={{ maxHeight: '600px', overflowY: 'auto', overflowX: 'auto' }} className="shadow-2xl shadow-stone-800 rounded-md">
                {loading ? (
                    <LoaderRegisterMobile />
                ) : registers && registers.length > 0 ? (
                    <table className="min-w-full text-center">
                        <thead>
                            <tr className="uppercase text-xs">
                                <td className="p-4 whitespace-nowrap">ID</td>
                                <td className="p-4 whitespace-nowrap">Objeto</td>
                                <td className="p-4 whitespace-nowrap">Detalle</td>
                                <td className="p-4 whitespace-nowrap">Marca</td>
                                <td className="p-4 whitespace-nowrap">Color</td>
                                <td className="p-4 whitespace-nowrap">Fecha encontrada</td>
                                <td className="p-4 whitespace-nowrap">Lugar encontrado</td>
                                <td className="p-4 whitespace-nowrap">Responsable</td>
                                <td className="p-4 whitespace-nowrap">Sector</td>
                                <td className="p-4 whitespace-nowrap">Estado</td>
                                <td className="p-4 whitespace-nowrap">Acción</td>
                            </tr>
                        </thead>
                        <tbody className="bg-colorBlueComponents rounded-md text-xs uppercase">
                            {registers.map((register) => (
                                <tr key={register.id_objeto_perdido}>
                                    <td className="py-2 px-4">{register.id_objeto_perdido}</td>
                                    <td className="py-2 px-4">{register.tipo_objeto}</td>
                                    <td className="py-2 px-4">
                                        {register.detalle}
                                    </td>
                                    <td className="py-2 px-4">
                                        {register.marca}
                                    </td>
                                    <td className="py-2 px-4">{register.color}</td>
                                    <td className="py-2 px-4">
                                        {register.fecha_hora_encuentro}
                                    </td>
                                    <td className="py-2 px-4">{register.lugar_de_encuentro}</td>
                                    <td className="py-2 px-4">{register.persona_que_encontro}</td>
                                    <td className="py-2 px-4">{register.sector}</td>
                                    <td className="py-2 px-4">
                                        <button onClick={() => openModal(register.id_objeto_perdido, register.estado)} className={`${getTextColorForState(register.estado)}  cursor-pointer `}>{register.estado}</button>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleViewImage(register)}
                                                className="text-green-600 hover:text-green-800 transition-colors duration-200"
                                                title="Ver imagen"
                                            >
                                                <BiImageAlt className="w-4 h-4 text-green-600" />
                                            </button>
                                            <button
                                                onClick={() => handlePrint(register)}
                                                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                                title="Imprimir ticket"
                                            >
                                                <BiPrinter className="w-4 h-4 text-cyan-600" />
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <CardNoData type="lost" />
                )
                }
            </div>
            {modal && modal.state && (
                <Modal isOpen={true} onClose={closeModal}>
                    <ModalChangedStateObjectLost state={modal.stateObject} id={modal.id} onClose={closeModal} success={() => { getData(''), closeModal() }} />
                </Modal>
            )}
        </div >
    )
}
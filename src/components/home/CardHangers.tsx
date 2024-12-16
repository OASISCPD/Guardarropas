import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { ScrollContainer } from "../logic/ScrollContainer";
import { useEffect, useState } from "react";
import { PiCoatHanger } from "react-icons/pi";
import { getPlacesByType, GetTypeDTO } from "../../types/box";
import { getPlacesClass } from "../../logic/places";
import { LuLoader2 } from "react-icons/lu";
import { toast } from "react-toastify";
import { Modal } from "../logic/Modal";
import { transformDataStorage } from "../mod/ModalBoxesForm";
import { TypeModal } from "../../types/modal";
import { FaTrash } from "react-icons/fa";
import { typeStorage } from "./HomeMobile";
import { ModalHangers } from "../mod/ModalHangersForm";
import { useMediaQuery } from "react-responsive";


interface CardHangersProps {
    setDataHanger: React.Dispatch<React.SetStateAction<typeStorage[]>>;

}

export function CardHangers({ setDataHanger }: CardHangersProps) {
    const isDesktop = useMediaQuery({ minWidth: 1024 })
    //constate que almacena la data del box que se agrego
    const [arrayDataHanger, setArrayDataHanger] = useState<transformDataStorage[]>()
    //booleano
    const [isOpen, setIsOpen] = useState<boolean>(isDesktop ? true : false)
    //constante que almacena la data de los boxes
    const [hangers, setHangers] = useState<GetTypeDTO[]>([]);
    //loading para la carga de datos
    const [loading, setLoading] = useState<boolean>(true); // Estado para indicar si la carga está en progreso
    //modal que maneja el formulario para agregar 
    const [modal, setModal] = useState<TypeModal>()

    //function que trae la data de los boxes
    async function getData() {
        setLoading(true)
        try {
            // Realizar la solicitud Fetch
            const data = await getPlacesByType({ type: 'percha' })
            // Actualizar el estado con los datos recibidos
            setHangers(data);
        } catch (error) {
            console.error(error);
        } finally {
            // La carga ha terminado, independientemente de si fue exitosa o no.
            setLoading(false);
        }
    }

    //function que valida el estado del box para ver si abir o no el modal
    function openModal(id: number, state: string, index: number) {
        /* toast(`${id} estado: ${state}`) */
        if (state.toUpperCase() === "OCUPADO") {
            toast.error(`Percha ${state}, retirar el registro para utilizar esta Percha `)
            return
        }
        if (state.toUpperCase() === "OLVIDADO") {
            toast.warning(`Percha ${state}, Pasar el registro a OLVIDADO para utilizar esta Percha `)
            return
        }
        setModal({ id: id, state: true, id_front: index })

    }
    function closeModal() {
        setModal({
            id: 0, state: false
        })
    }
    //funtion qu eme printea los valores que creo el formulario
    function transformDataToHanger(data: transformDataStorage[]) {
        console.log("DATA A ENVIAR DESDE EL FORMULARIO", data)
        setArrayDataHanger((prevData = []) => [...prevData, ...data]);
        setDataHanger((prevData = []) => [...prevData, ...data])
        setModal({ id: 0, state: false, id_front: 0 })
        toast.success('Se agrego el objeto correctamente')
    }

    // Función para eliminar un elemento por su índice
    const deleteByIndex = (indexToDelete: number) => {
        if (!arrayDataHanger) {
            console.log('No hay Data')
            return
        }
        const updatedArray = arrayDataHanger.filter((_, index) => index !== indexToDelete);
        setArrayDataHanger(updatedArray);
        setDataHanger(updatedArray)
        toast.success('Se elimino correctamente')
    };

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className='mb-2 bg-colorGray rounded-md p-4'>
            <div className=' flex justify-between mb-4 items-center '>
                <div className="flex justify-center items-center mr-auto">
                    <PiCoatHanger className="text-colorOrange" size={32} />
                    <h2 className="text-lg mx-2 tracking-widest  "> PERCHA</h2>
                </div>
                {!isOpen ? (

                    <IoIosArrowDown className="cursor-pointer" onClick={() => setIsOpen(!isOpen)} size={32} />
                ) : (
                    <IoIosArrowUp className="cursor-pointer" onClick={() => setIsOpen(!isOpen)} size={32} />
                )}
            </div>
            <div
                className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                {loading ? (
                    <ScrollContainer maxHeight="400px">
                        <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 pt-4">
                            {[...Array(50)].map((_, i) => (
                                <button
                                    key={i}
                                    className="aspect-square animate-pulse bg-colorGrayLight rounded flex items-center justify-center text-xl  text-black  transition-colors"
                                >
                                    <LuLoader2 size={20} className="animate-spin" />
                                </button>
                            ))}
                        </div>
                    </ScrollContainer>
                ) : (
                    <ScrollContainer maxHeight="400px">
                        <div className="grid grid-cols-6 sm:grid-cols-12 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12 gap-2 pt-4 lg:overflow-x-hidden">
                            {hangers.map((hanger, i) => (
                                <button
                                    onClick={() => openModal(hanger.id_lugar, hanger.estado, (i + 1))}
                                    key={hanger.id_lugar}
                                    className={`${getPlacesClass(hanger.estado)}  aspect-square lg:aspect-video  rounded flex items-center justify-center text-lg    transition-colors`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </ScrollContainer>
                )
                }
            </div >
            {arrayDataHanger && (
                <div className="p-4 ">
                    {arrayDataHanger.map((data, index) => (
                        <div key={index} className="border text-sm my-2 rounded-sm border-colorWhiteShadow border-opacity-50  flex items-center justify-around  gap-4">
                            <h1>Percha: {data.id_front} </h1>
                            <h1 >{data.prenda}</h1>
                            <FaTrash onClick={() => deleteByIndex(index)} className="cursor-pointer text-colorRed hover:text-red-600" />
                        </div>
                    ))
                    }
                </div>
            )}
            {modal && modal.state && (
                <Modal isOpen={true} onClose={closeModal}>
                    <ModalHangers index={modal.id_front} onSuccess={transformDataToHanger} id={modal.id} onClose={closeModal} />
                </Modal>
            )}
        </div >
    )
}
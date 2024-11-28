import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { ScrollContainer } from "../../logic/ScrollContainer";
import { useEffect, useState } from "react";
import { BsBox } from "react-icons/bs";
import { getPlacesByType, GetTypeDTO } from "../../../types/box";
import { getPlacesClass } from "../../../logic/places";
import { LuLoader2 } from "react-icons/lu";
import { toast } from "react-toastify";
import { Modal } from "../../logic/Modal";
import { ModalBoxes } from "../../mod/ModalBoxesForm";
import { TypeModal } from "../../../types/modal";


export function CardBoxes() {
    //booleano
    const [isOpen, setIsOpen] = useState<boolean>(false)
    //constante que almacena la data de los boxes
    const [boxs, setBoxs] = useState<GetTypeDTO[]>([]);
    //loading para la carga de datos
    const [loading, setLoading] = useState<boolean>(true); // Estado para indicar si la carga está en progreso
    //modal que maneja el formulario para agregar 
    const [modal, setModal] = useState<TypeModal>()

    //function que trae la data de los boxes
    async function getData() {
        setLoading(true)
        try {
            // Realizar la solicitud Fetch
            const data = await getPlacesByType({ type: 'box' })
            // Actualizar el estado con los datos recibidos
            setBoxs(data);
        } catch (error) {
            console.error(error);
        } finally {
            // La carga ha terminado, independientemente de si fue exitosa o no.
            setLoading(false);
        }
    }

    //function que valida el estado del box para ver si abir o no el modal
    function openModal(id: number, state: string) {
        /* toast(`${id} estado: ${state}`) */
        if (state.toUpperCase() === "OCUPADO") {
            toast.error(`Box ${state}, retirar el registro para utilizar este BOX `)
            return
        }
        if (state.toUpperCase() === "OLVIDADO") {
            toast.warning(`Box ${state}, Pasar el registro a OLVIDADO para utilizar este BOX `)
            return
        }
        setModal({ id: id, state: true })

    }
    function closeModal() {
        setModal({
            id: 0, state: false
        })
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <div className='mb-2 bg-colorGray rounded-md p-4'>
            <div className=' flex justify-between mb-4 items-center '>
                <div className="flex justify-center items-center mx-auto">
                    <BsBox className="text-colorOrange" size={32} />
                    <h2 className="text-lg mx-2  "> BOXES</h2>
                </div>
                {!isOpen ? (

                    <IoIosArrowDown onClick={() => setIsOpen(!isOpen)} size={32} />
                ) : (
                    <IoIosArrowUp onClick={() => setIsOpen(!isOpen)} size={32} />
                )}
            </div>
            <div
                className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                {loading ? (
                    <ScrollContainer maxHeight="400px">
                        <div className="grid grid-cols-6 gap-2 pt-4">
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
                        <div className="grid grid-cols-6 gap-2 pt-4 ">
                            {boxs.map((box, i) => (
                                <button
                                    onClick={() => openModal(box.id_lugar, box.estado)}
                                    key={box.id_lugar}
                                    className={`${getPlacesClass(box.estado)}  aspect-square  rounded flex items-center justify-center text-lg   transition-colors`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </ScrollContainer>
                )
                }
            </div >
            {/* <div className="p-4  ">
                <div className="border rounded-sm border-colorWhiteShadow border-opacity-50  flex items-center justify-center  gap-4">
                    <h1>BOX: 22 </h1>
                    <h1 >MOCHILA</h1>
                    <FaTrash />
                </div>
            </div> */}
            {modal && modal.state && (
                <Modal isOpen={true} onClose={closeModal}>
                    <ModalBoxes id={modal.id} onClose={closeModal} />
                </Modal>
            )}
        </div >
    )
}
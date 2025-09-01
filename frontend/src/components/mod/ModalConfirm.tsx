import { IoMdClose } from "react-icons/io";

interface propModal {
    onClose: () => void;
    onCloseOk: () => void;
    text: string
}
export function ModalConfirm({ onClose, onCloseOk, text }: propModal) {
    return (
        <section className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ">
            <div className="rounded-md shadow-xl max-w-sm sm:max-w-md w-full bg-colorBlueComponents">
                <div className="rounded-md shadow min-h-60 p-6">
                    <div className="flex items-center justify-between mb-2">
                        <button onClick={onClose} className="text-white   hover:text-zinc-200 rounded-md text-sm h-8 w-8 ms-auto inline-flex justify-center items-center">
                            <IoMdClose size={30} />
                        </button>
                    </div>
                    <div className="text-center text-white">
                        <h3 className="text-xl ">Confirmación</h3>
                        <p className=" my-2">¿Estás seguro/a de realizar esta acción?</p>
                        <p className=" my-2 text-sm">{text}</p>
                        <div className="flex justify-center space-x-4 text-xs sm:text-sm mt-4">
                            <button onClick={onClose} className="bg-colorRed  text-white  py-2 px-6 rounded-md shadow-lg transition-transform duration-100 hover:scale-105">
                                Cancelar
                            </button>
                            <button onClick={onCloseOk} className="bg-colorGreen  text-white  py-2 px-6 rounded-md shadow-lg transition-transform duration-100 hover:scale-105">
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
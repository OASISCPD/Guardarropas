import { useState } from "react"
import { Modal } from "../logic/Modal"
import { ModalAddNewness } from "../mod/ModalAddNewness"


interface propButton {
    success: () => void
}
export function ButtonAddNew({ success }: propButton) {
    //modal
    const [modal, setModal] = useState<boolean>(false)

    function openModal() {
        setModal(true)
    }
    function closeModal() {
        setModal(false)
    }
    function closeModalSuccess() {
        success()
        setModal(false)
    }
    return (
        <div className="col-span-1 ">
            <button onClick={openModal} className="bg-gradient-to-r from-colorOrange to-orange-600 hover:from-orange-600 hover:to-orange-700 px-8 sm:px-16 py-2 hover:scale-105 duration-100  rounded-md">
                Añadir Novedad
            </button>
            {modal && (
                <Modal isOpen={true} onClose={closeModal}>
                    <ModalAddNewness onClose={closeModal} success={closeModalSuccess} />
                </Modal>
            )}
        </div>
    )
}
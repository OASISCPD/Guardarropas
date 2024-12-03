import { useState } from "react"
import { Modal } from "../../logic/Modal"
import { ModalAddNewness } from "../../mod/ModalAddNewness"
import { ModalAddObjectLost } from "../../mod/ModalAddObjectLost"


interface propButton {
    success: () => void
}
export function ButtonAddObject({ success }: propButton) {
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
            <button onClick={openModal} className="bg-colorBlue px-8 sm:px-16 py-3  rounded-md">
                Agregar
            </button>
            {modal && (
                <Modal isOpen={true} onClose={closeModal}>
                    <ModalAddObjectLost onClose={closeModal} success={closeModalSuccess} />
                </Modal>
            )}
        </div>
    )
}
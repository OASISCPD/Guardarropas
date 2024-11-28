import { useState } from "react"
import { Modal } from "../../logic/Modal"
import { ModalAddNewness } from "../../mod/ModalAddNewness"


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
            <button onClick={openModal} className="bg-colorBlue p-2 py-3.5  rounded-md">
                Nueva Novedad
            </button>
            {modal && (
                <Modal isOpen={true} onClose={closeModal}>
                    <ModalAddNewness onClose={closeModal} success={closeModalSuccess} />
                </Modal>
            )}
        </div>
    )
}
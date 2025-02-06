import { useState } from "react";
import { Modal } from "../logic/Modal";
import { ModalExport } from "../mod/ModalExport";

export function ExportHistorial() {
    //constante que habilita el modal 
    const [modal, setModal] = useState<boolean>(false)

    function openModal() {
        setModal(true)
    }

    function closeModal() {
        setModal(false)
    }
    return (
        <>
            <div className="p-4 flex w-full  justify-end items-center">
                <button onClick={openModal} className="bg-colorExportsGreen  px-6 py-2 rounded-md border border-white text-sm">
                    Exportar
                </button>
            </div>
            {modal && (
                <Modal isOpen={true} onClose={closeModal}>
                    <ModalExport onClose={closeModal} />
                </Modal>
            )}
        </>
    )
}

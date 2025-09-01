import { useState } from "react";
import { Modal } from "../logic/Modal";
import { ModalExport } from "../mod/ModalExport";
import { HiDownload } from "react-icons/hi";

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
            <div className="p-4 flex w-full justify-end items-center">
                <button
                    onClick={openModal}
                    className="inline-flex items-center gap-2 bg-colorExportsGreen hover:bg-green-500/80 px-4 py-2 rounded-md border border-green-500 hover:border-green-600 text-white text-sm font-medium transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                >
                    <HiDownload className="w-4 h-4" />
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

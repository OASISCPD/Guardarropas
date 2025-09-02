import { IoMdClose } from "react-icons/io";
import { FiAlertCircle, FiX, FiCheck } from "react-icons/fi";

interface propModal {
    onClose: () => void;
    onCloseOk: () => void;
    text: string;
}

export function ModalConfirm({ onClose, onCloseOk, text }: propModal) {
    return (
        <section className="fixed inset-0 z-50 overflow-y-auto">
            
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative w-full max-w-sm sm:max-w-md transform overflow-hidden rounded-lg bg-slate-900 border border-slate-700 shadow-2xl transition-all animate-in fade-in-0 zoom-in-95 duration-300">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-slate-700">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                                <FiAlertCircle className="text-white" size={16} />
                            </div>
                            <h3 className="text-lg font-medium text-slate-100">Confirmación</h3>
                        </div>
                        <button 
                            onClick={onClose}
                            className="group inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-all duration-200"
                        >
                            <IoMdClose size={20} className="group-hover:scale-110 transition-transform" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 text-center">
                        <div className="mb-4">
                            <p className="text-slate-300 text-base mb-2">
                                ¿Estás seguro/a de realizar esta acción?
                            </p>
                            {text && (
                                <p className="text-sm text-slate-400 bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                                    {text}
                                </p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex justify-center gap-3 pt-4 border-t border-slate-700">
                            <button 
                                onClick={onClose} 
                                className="inline-flex items-center gap-2 px-6 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-slate-100 border border-slate-600 hover:border-slate-500 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                            >
                                <FiX size={16} />
                                Cancelar
                            </button>
                            <button 
                                onClick={onCloseOk} 
                                className="inline-flex items-center gap-2 px-6 py-2 bg-colorOrange hover:bg-orange-600 text-white border border-orange-500 rounded-lg font-medium shadow-lg transition-all duration-200 hover:scale-105"
                            >
                                <FiCheck size={16} />
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
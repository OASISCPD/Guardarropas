import { toast } from "react-toastify";
import { ClientSelectDTO } from "../../types/client";
import { FiUser, FiCreditCard, FiPhone, FiTrash2, FiUserCheck } from "react-icons/fi";

interface propCard {
    name: string
    dni: number | string
    phone: string | number
    setUserSelect: React.Dispatch<React.SetStateAction<ClientSelectDTO | undefined>>;
}

export function CardClientSelect({ dni, name, phone, setUserSelect }: propCard) {

    function deleteUser() {
        setUserSelect({ client: '', dni: '', phone: '', id_cliente: 0, id_usuario: 0 })
        toast.success("Cliente eliminado correctamente")
    }

    return (
        <div className="p-4 lg:p-4">
            <div className="w-full max-w-sm mx-auto lg:mx-0 lg:max-w-md bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-slate-900 px-3 py-2 border-b border-slate-700">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                            <FiUserCheck className="text-white" size={12} />
                        </div>
                        <div>
                            <h3 className="text-xs font-medium text-slate-100">Cliente Seleccionado</h3>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-3">
                    <div className="space-y-3">
                        {/* Nombre */}
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-slate-700 rounded flex items-center justify-center flex-shrink-0">
                                <FiUser className="text-slate-300" size={12} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <label className="block text-xs text-slate-400 mb-0.5">NOMBRE</label>
                                <p className="text-slate-100 text-sm font-medium capitalize truncate">{name.toLowerCase()}</p>
                            </div>
                        </div>

                        {/* DNI y Teléfono en una fila para desktop */}
                        <div className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-3">
                            {/* DNI */}
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-slate-700 rounded flex items-center justify-center flex-shrink-0">
                                    <FiCreditCard className="text-slate-300" size={12} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <label className="block text-xs text-slate-400 mb-0.5">DNI</label>
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-900/50 text-blue-200 border border-blue-700">
                                        {dni}
                                    </span>
                                </div>
                            </div>

                            {/* Teléfono */}
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-slate-700 rounded flex items-center justify-center flex-shrink-0">
                                    <FiPhone className="text-slate-300" size={12} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <label className="block text-xs text-slate-400 mb-0.5">TELÉFONO</label>
                                    {phone ? (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-900/50 text-green-200 border border-green-700">
                                            {phone}
                                        </span>
                                    ) : (
                                        <span className="text-slate-500 italic text-xs">Sin teléfono</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-4 pt-3 border-t border-slate-700">
                        <button
                            onClick={deleteUser}
                            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 border border-colorRed  text-white text-xs font-medium rounded transition-all duration-200 "
                        >
                            <FiTrash2 size={14} />
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
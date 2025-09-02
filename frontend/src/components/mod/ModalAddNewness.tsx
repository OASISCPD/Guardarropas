import { IoMdClose } from "react-icons/io";
import { ScrollContainer } from "../logic/ScrollContainer";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getUserSession } from "../../logic/user";
import { LoaderRegisterHoverMobile } from "../loaders/LoaderRegister";
import { BaseUrl } from "../../logic/api";
import { toast } from "react-toastify";
import { FiUser, FiMessageSquare, FiSave } from "react-icons/fi";
import { HiOutlineSpeakerphone } from "react-icons/hi";

const StyleInput = "w-full px-4 py-3 bg-slate-900/50 border border-slate-600 text-slate-100 placeholder-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-colorOrange focus:border-colorOrange transition-all duration-200";


interface sendNewnessDTO {
    user: string
    mensaje: string
}

interface propModal {
    onClose: () => void
    success: () => void
}
export function ModalAddNewness({ onClose, success }: propModal) {
    ///loading al mandar el mensaje al fetch
    const [loading, setLoading] = useState<boolean>(false)
    const { register, setValue, handleSubmit } = useForm<sendNewnessDTO>()
    const [user, setUser] = useState<string>('')
    // Función que maneja el envío del formulario
    async function onSubmit(data: sendNewnessDTO) {
        setLoading(true)
        console.log(data); // Aquí se muestra el contenido del formulario cuando se envía
        try {
            const formdata = new FormData();
            formdata.append("mensaje", data.mensaje);
            const response = await fetch(`${BaseUrl}/add_novedad`, {
                method: 'POST',
                body: formdata,
                credentials: "include" as RequestCredentials,
                redirect: 'follow' as RequestRedirect,
                mode: 'cors' as RequestMode,
            });
            if (!response.ok) {
                throw new Error(`Error en la petición: ${response.status}`);
            }
            const result = await response.text();
            console.log(result)
            toast.success('Nueva novedad agregada')
            success()
        } catch (error) {
            console.error(error)
            toast.error('Error en el envio')
        } finally {
            setLoading(false)
        }
    }

    async function getData() {
        try {
            const data = await getUserSession();
            console.log(data)
            if (!data) {
                return
            }
            setUser(data.nombre)
            setValue('user', data.nombre)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        //llamando a la funcion q trae la session del user
        getData()
    }, [])
    return (
        <section className="fixed top-0 left-0 w-full h-full flex items-center justify-center  backdrop-blur-xs z-50">
            <div className="bg-slate-800/95 backdrop-blur-sm rounded-xl shadow-2xl border border-slate-600 max-w-lg w-full mx-4">
                {loading && (
                    <LoaderRegisterHoverMobile />
                )}
                
                {/* Header del Modal */}
                <div className="flex items-center justify-between p-6 border-b border-slate-700">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                            <HiOutlineSpeakerphone className="w-5 h-5 text-colorOrange" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-slate-100">Nueva Novedad</h3>
                            <p className="text-sm text-slate-400">Agregar mensaje al sistema</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-all duration-200"
                    >
                        <IoMdClose size={20} />
                    </button>
                </div>

                {/* Contenido del Modal */}
                <div className="p-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <ScrollContainer maxHeight="350px">
                            <div className="space-y-6">
                                {/* Campo Usuario */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                                        <FiUser className="w-4 h-4 text-slate-400" />
                                        Usuario
                                    </label>
                                    <div className="relative">
                                        <input
                                            {...register('user')}
                                            type="text"
                                            autoComplete='off'
                                            name="user"
                                            id='user'
                                            disabled
                                            value={user}
                                            className={`${StyleInput} bg-slate-800/50 text-slate-300 cursor-not-allowed`}
                                            placeholder="Usuario del sistema"
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Campo Mensaje */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                                        <FiMessageSquare className="w-4 h-4 text-slate-400" />
                                        Mensaje
                                        <span className="text-colorOrange text-xs">*</span>
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            {...register('mensaje')}
                                            autoComplete='off'
                                            name="mensaje"
                                            id='mensaje'
                                            required
                                            defaultValue={''}
                                            rows={5}
                                            className={StyleInput}
                                            placeholder="Escribe el mensaje de la novedad aquí..."
                                        />
                                        <div className="absolute top-3 right-3">
                                            <FiMessageSquare className="w-4 h-4 text-slate-500" />
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500">
                                        Este mensaje será visible para todos los usuarios del sistema
                                    </p>
                                </div>
                            </div>
                        </ScrollContainer>

                        {/* Footer con Botones */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-700">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-slate-100 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg transition-all duration-200"
                                disabled={loading}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center gap-2 px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-colorOrange to-orange-600 hover:from-orange-600 hover:to-orange-700 border border-orange-500 hover:border-orange-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Guardando...</span>
                                    </>
                                ) : (
                                    <>
                                        <FiSave className="w-4 h-4" />
                                        <span>Guardar Novedad</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
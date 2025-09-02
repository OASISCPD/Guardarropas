import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { FiUser, FiSave } from "react-icons/fi";
import { ScrollContainer } from "../logic/ScrollContainer";
import { formatClientDataUpdate } from "../../logic/clients";
import { formatDate, isAdult } from "../../logic/date";
import { useEffect, useState } from "react";
import { BaseUrl } from "../../logic/api";
import { toast } from "react-toastify";
import { ClientDataUpdateDTO, GetClientDTO } from "../../types/client";
import { inputStyle } from "../../utils/style";



export interface propForm {
    body: GetClientDTO
    onClose: () => void
    success: () => void
}

export function ModalEditClient({ success, onClose, body }: propForm) {
    const { register, setValue, handleSubmit, formState: { isSubmitting } } = useForm<GetClientDTO>();
    const [isLoading, setIsLoading] = useState(false);

    // Función que maneja el envío del formulario
    async function onSubmit(data: GetClientDTO) {
        const valid = isAdult(data.date_nacimiento);
        if (!valid) {
            toast.error('La fecha de nacimiento es errónea, el cliente no puede ser menor de edad');
            return;
        }

        setIsLoading(true);
        
        try {
            const dataFinal: ClientDataUpdateDTO = formatClientDataUpdate(data);
            const formData = new URLSearchParams();

            Object.keys(dataFinal).forEach((key) => {
                const value = dataFinal[key as keyof ClientDataUpdateDTO];
                if (value !== undefined) {
                    formData.append(key, String(value));
                }
            });

            const res = await fetch(`${BaseUrl}/update_cliente`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData,
                credentials: 'include',
                redirect: 'follow',
            });

            await res.text();
            
            if (res.ok) {
                toast.success('Cambios guardados correctamente');
                success();
            } else {
                toast.error('Hubo un error, inténtalo nuevamente');
            }
        } catch (error) {
            console.error('Error en la actualización del cliente:', error);
            toast.error('Hubo un error, inténtalo nuevamente');
        } finally {
            setIsLoading(false);
        }
    }

    // Inicializar campos en useEffect
    useEffect(() => {
        Object.keys(body).forEach((key) => {
            const typedKey = key as keyof GetClientDTO;

            if (typedKey === "date_nacimiento") {
                setValue(typedKey, formatDate(body[typedKey]));
            } else {
                setValue(typedKey, body[typedKey] ?? "");
            }
        });
    }, [body, setValue]);

    return (
        <section className="fixed inset-0 z-50 overflow-y-auto">
            
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-slate-900 border border-slate-700 shadow-2xl transition-all animate-in fade-in-0 zoom-in-95 duration-300">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-slate-700">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
                                <FiUser className="text-colorOrange" size={16} />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-slate-100">Editar Cliente</h3>
                                <p className="text-xs text-slate-400">ID: {body.id_cliente}</p>
                            </div>
                        </div>
                        <button 
                            onClick={onClose}
                            disabled={isLoading}
                            className="group inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-all duration-200 disabled:opacity-50"
                        >
                            <IoMdClose size={20} className="group-hover:scale-110 transition-transform" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                        <form className="text-xs" onSubmit={handleSubmit(onSubmit)}>
                            <ScrollContainer maxHeight="400px">
                                <div className="space-y-4">
                                    {/* N° Documento */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">
                                            N° de Documento <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            {...register('n_documento')}
                                            type="text"
                                            autoComplete="off"
                                            required
                                            defaultValue={body.n_documento}
                                            className={inputStyle}
                                        />
                                    </div>

                                    {/* Nombre */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">
                                            Nombre <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            {...register('nombre')}
                                            type="text"
                                            autoComplete="off"
                                            required
                                            defaultValue={body.nombre}
                                            className={inputStyle}
                                        />
                                    </div>

                                    {/* Apellido */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">
                                            Apellido <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            {...register('apellido')}
                                            type="text"
                                            autoComplete="off"
                                            required
                                            defaultValue={body.apellido}
                                            className={inputStyle}
                                        />
                                    </div>

                                    {/* Fecha de Nacimiento */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">
                                            Fecha de Nacimiento <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            {...register('date_nacimiento')}
                                            type="date"
                                            required
                                            defaultValue={formatDate(body.date_nacimiento)}
                                            className={inputStyle}
                                        />
                                    </div>

                                    {/* Provincia */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">Provincia</label>
                                        <input
                                            {...register('provincia')}
                                            type="text"
                                            autoComplete="off"
                                            defaultValue={body.provincia}
                                            className={inputStyle}
                                        />
                                    </div>

                                    {/* Localidad */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">Localidad</label>
                                        <input
                                            {...register('localidad')}
                                            type="text"
                                            autoComplete="off"
                                            defaultValue={body.localidad}
                                            className={inputStyle}
                                        />
                                    </div>

                                    {/* Dirección */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">Dirección</label>
                                        <input
                                            {...register('direccion')}
                                            type="text"
                                            autoComplete="off"
                                            defaultValue={body.direccion}
                                            className={inputStyle}
                                        />
                                    </div>

                                    {/* Celular */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">Celular</label>
                                        <input
                                            {...register('celular')}
                                            type="text"
                                            autoComplete="off"
                                            defaultValue=""
                                            className={inputStyle}
                                        />
                                    </div>
                                </div>
                            </ScrollContainer>

                            {/* Actions */}
                            <div className="mt-6 pt-4 border-t border-slate-700">
                                <button
                                    type="submit"
                                    disabled={isLoading || isSubmitting}
                                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-colorOrange hover:bg-orange-600 disabled:bg-slate-600 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                            Guardando...
                                        </>
                                    ) : (
                                        <>
                                            <FiSave size={16} />
                                            Guardar Cambios
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}   
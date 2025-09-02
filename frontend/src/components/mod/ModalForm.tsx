import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { ScrollContainer } from "../logic/ScrollContainer";
import { BaseUrl } from "../../logic/api";
import { isAdult } from "../../logic/date";
import { toast } from "react-toastify";
import { useState } from "react";
import { LoaderRegisterHoverMobile } from "../loaders/LoaderRegister";
import { getClientById } from "../../logic/clients";
import { GetClientDTO } from "../../types/client";
import { inputStyle } from "../../utils/style";

export interface FormDataDTO {
    n_documento: number | string
    tipo_documento: string
    apellido: string
    nombre: string
    genero: string
    fecha_nacimiento: string
    localidad: string
    direccion: string
    celular: string | number
    provincia: string
}


export interface propForm {
    body: FormDataDTO
    onClose: () => void
    onSuccess: (dni: number | string, lastName: string, name: string, phone: string | number, id_cliente: number, id_usuario: number) => void
}


export function ModalForm({ onClose, body, onSuccess }: propForm) {

    const { register, handleSubmit } = useForm<FormDataDTO>()
    //loading que maneja el hover a mostrar mientras se envia la data
    const [loading, setLoading] = useState<boolean>(false)
    // Función que maneja el envío del formulario
    async function onSubmit(data: FormDataDTO) {
        setLoading(true)
        //funcion que valida la fecha ingresada de nacimiento
        const valid = isAdult(data.fecha_nacimiento);
        if (!valid) {
            toast.error('La fecha de nacimiento es erronea, no puede ser menor de edad el cliente')
            setLoading(false)
            /*    setLoading(false) */
            return
        }
        // Revisar y transformar los datos
        console.log("Datos originales:", data);
        const formData = Object.entries(data).reduce((acc, [key, value]) => {
            acc[key] = String(value); // Convertir todos los valores a string
            return acc;
        }, {} as Record<string, string>);

        console.log("Datos transformados:", formData);
        const requestOptions: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams(formData), // Ahora usamos el objeto compatible
            credentials: "include" as RequestCredentials,
            redirect: "follow" as RequestRedirect,
        };
        try {
            const response = await fetch(
                `${BaseUrl}/guardar_cliente`, requestOptions
            );
            if (!response.ok) {
                throw new Error("ERROR");

            }
            const result = parseInt(await response.text());
            toast.success(`Cliente N°${result} registrado con exito`)
            getClientAdd(result)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }

    }

    //funcion que trae el cliente cpor el id y completa los campos para la card
    async function getClientAdd(id_cliente: number) {
        const data: GetClientDTO[] | null = await getClientById(id_cliente)
        if (!data) {
            toast.error('Ocurrio un error, el cliente pudo ser cargado, pero debes volver a buscarlo por el dni para asociarlo')
            setLoading(false)
            return
        }
        console.log(data)
        onSuccess(data[0].n_documento, data[0].apellido, data[0].nombre, data[0].celular, data[0].id_cliente, data[0].id_usuario)
    }
    /*     useEffect(() => {
            getClientAdd(1049)
        }, [])
     */
    return (
        <section className="fixed top-0 left-0 w-full h-full flex items-center justify-center  z-500">
            <div className="rounded-xl shadow-xl max-w-md w-full mx-4 md:mx-auto ">
                <div className=" bg-slate-900  rounded-md shadow min-h-60 ">
                    {loading && (
                        <LoaderRegisterHoverMobile />
                    )}
                    <div className="flex items-center justify-between p-4">
                        <h3 className="text-xl strokeWidth text-gray-900"></h3>
                        <button className="text-white bg-transparent  hover:text-gray-900 rounded-md text-sm h-8 w-8 ms-auto inline-flex justify-center items-center " onClick={onClose}>
                            <IoMdClose size={40} />
                        </button>
                    </div>
                    <div className="p-4">
                        <form className="text-black text-xs uppercase" onSubmit={handleSubmit(onSubmit)}>
                            <ScrollContainer maxHeight="400px">
                                <div className="border border-stone-400 p-4 m-4 rounded-md">
                                    <div className="mb-4">
                                        <label className="block   text-white">N° De Documento</label>
                                        <input
                                            {...register('n_documento')}
                                            type="text"
                                            autoComplete='off'
                                            name="n_documento"
                                            id='n_documento'
                                            required
                                            defaultValue={body.n_documento}
                                            className={inputStyle}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-white">Tipo de Documento</label>
                                        <select
                                            {...register('tipo_documento')}
                                            autoComplete='off'
                                            name="tipo_documento"
                                            id='tipo_documento'
                                            defaultValue={body.tipo_documento || ""}
                                            className={inputStyle}
                                        >
                                            <option value="" disabled>Elegir Opción</option>
                                            <option value="DNI">DNI</option>
                                            <option value="PASAPORTE">PASAPORTE</option>
                                            <option value="CUIL">CUIL</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block   text-white">Nombre</label>
                                        <input
                                            {...register('nombre')}
                                            type="text"
                                            autoComplete='off'
                                            name="nombre"
                                            id='nombre'
                                            required
                                            defaultValue={body.nombre}
                                            className={inputStyle}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block   text-white">Apellido</label>
                                        <input
                                            {...register('apellido')}
                                            type="text"
                                            autoComplete='off'
                                            name="apellido"
                                            id='apellido'
                                            required
                                            defaultValue={body.apellido}
                                            className={inputStyle}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2   text-white ">Fecha de nacimiento</label>
                                        <input {...register('fecha_nacimiento')} type="date" name="fecha_nacimiento" id="fecha_nacimiento" defaultValue={body.fecha_nacimiento} placeholder="Desde DD-MM-AAAA" className={inputStyle} required />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-white">Genero</label>
                                        <select
                                            {...register('genero')}
                                            autoComplete='off'
                                            name="genero"
                                            id='genero'
                                            defaultValue={body.genero || ""}
                                            className={inputStyle}
                                        >
                                            <option value="" disabled>Elegir Opción</option>
                                            <option value="F">FEMENINO</option>
                                            <option value="M">MASCULINO</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block   text-white">Provincia</label>
                                        <input
                                            {...register('provincia')}
                                            type="text"
                                            autoComplete='off'
                                            name="provincia"
                                            id='provincia'
                                            defaultValue={body.provincia}
                                            className={inputStyle}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block   text-white">Localidad</label>
                                        <input
                                            {...register('localidad')}
                                            type="text"
                                            autoComplete='off'
                                            name="localidad"
                                            id='localidad'
                                            defaultValue={body.localidad}
                                            className={inputStyle}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block   text-white">Direccion</label>
                                        <input
                                            {...register('direccion')}
                                            type="text"
                                            autoComplete='off'
                                            name="direccion"
                                            id='direccion'
                                            defaultValue={body.direccion}
                                            className={inputStyle}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block   text-white">Celular</label>
                                        <input
                                            {...register('celular')}
                                            type="text"
                                            autoComplete='off'
                                            name="celular"
                                            id='celular'
                                            placeholder="00000000"
                                            defaultValue={''}
                                            className={inputStyle}
                                        />
                                    </div>
                                </div>
                            </ScrollContainer>
                            <div className="  mt-4 flex justify-center">
                                <button type="submit" className="bg-colorBlue rounded-md mx-2 px-8 py-3 w-full text-center  shadow-xl  flex justify-center items-center text-white" >Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section >
    )
}   
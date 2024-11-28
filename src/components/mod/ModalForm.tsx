import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { ScrollContainer } from "../logic/ScrollContainer";

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
}


export function ModalForm({ onClose, body }: propForm) {
    const { register, setValue, getValues, handleSubmit } = useForm<FormDataDTO>()

    // Función que maneja el envío del formulario
    function onSubmit(data: FormDataDTO) {
        console.log(data); // Aquí se muestra el contenido del formulario cuando se envía
    }

    return (
        <section className="fixed top-0 left-0 w-full h-full flex items-center justify-center  z-500">
            <div className="rounded-xl shadow-xl max-w-md w-full mx-4 md:mx-auto ">
                <div className=" bg-colorGray  rounded-md shadow min-h-60 ">
                    <div className="flex items-center justify-between p-4">
                        <h3 className="text-xl strokeWidth text-gray-900"></h3>
                        <button className="text-white bg-transparent  hover:text-gray-900 rounded-md text-sm h-8 w-8 ms-auto inline-flex justify-center items-center " onClick={onClose}>
                            <IoMdClose size={40} />
                        </button>
                    </div>
                    <div className="p-4">
                        <form className="text-black text-xs uppercase" onSubmit={handleSubmit(onSubmit)}>
                            <ScrollContainer maxHeight="400px">
                                <div className="mb-4">
                                    <label className="block  font-medium text-white">N° De Documento</label>
                                    <input
                                        {...register('n_documento')}
                                        type="text"
                                        autoComplete='off'
                                        name="n_documento"
                                        id='n_documento'
                                        defaultValue={body.n_documento}
                                        className="w-full px-4 py-2 border border-gray-300  rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block  font-medium text-white">Nombre</label>
                                    <input
                                        {...register('nombre')}
                                        type="text"
                                        autoComplete='off'
                                        name="nombre"
                                        id='nombre'
                                        defaultValue={body.nombre}
                                        className="w-full px-4 py-2 border border-gray-300  rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block  font-medium text-white">Apellido</label>
                                    <input
                                        {...register('apellido')}
                                        type="text"
                                        autoComplete='off'
                                        name="apellido"
                                        id='apellido'
                                        defaultValue={body.apellido}
                                        className="w-full px-4 py-2 border border-gray-300  rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2  font-medium text-white ">Fecha de nacimiento</label>
                                    <input {...register('fecha_nacimiento')} type="date" name="fecha_nacimiento" id="fecha_nacimiento" defaultValue={body.fecha_nacimiento} placeholder="Desde DD-MM-AAAA" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
                                </div>
                                <div className="mb-4">
                                    <label className="block  font-medium text-white">Provincia</label>
                                    <input
                                        {...register('provincia')}
                                        type="text"
                                        autoComplete='off'
                                        name="provincia"
                                        id='provincia'
                                        defaultValue={body.provincia}
                                        className="w-full px-4 py-2 border border-gray-300  rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block  font-medium text-white">Localidad</label>
                                    <input
                                        {...register('localidad')}
                                        type="text"
                                        autoComplete='off'
                                        name="localidad"
                                        id='localidad'
                                        defaultValue={body.localidad}
                                        className="w-full px-4 py-2 border border-gray-300  rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block  font-medium text-white">Direccion</label>
                                    <input
                                        {...register('direccion')}
                                        type="text"
                                        autoComplete='off'
                                        name="direccion"
                                        id='direccion'
                                        defaultValue={body.direccion}
                                        className="w-full px-4 py-2 border border-gray-300  rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block  font-medium text-white">Celular</label>
                                    <input
                                        {...register('celular')}
                                        type="text"
                                        autoComplete='off'
                                        name="celular"
                                        id='celular'
                                        defaultValue={''}
                                        className="w-full px-4 py-2 border border-gray-300  rounded-md"
                                    />
                                </div>
                            </ScrollContainer>
                            <div className="  mt-4 flex justify-center">
                                <button type="submit" className="bg-colorBlue rounded-md mx-2 px-8 py-3 w-full text-center  shadow-xl  flex justify-center items-center text-white" >Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}   
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { ScrollContainer } from "../logic/ScrollContainer";
import { formatClientDataUpdate } from "../../logic/clients";
import { formatDate } from "../../logic/date";
import { useEffect } from "react";
import { BaseUrl } from "../../logic/api";
import { toast } from "react-toastify";
import { ClientDataUpdateDTO, GetClientDTO } from "../../types/client";



export interface propForm {
    body: GetClientDTO
    onClose: () => void
    success: () => void
}
/* DTO PARA EL ENVIO DEL UPDATE

id_cliente: 53
n_documento: 44392765
tipo_documento: Pasaporte
nombre: FLORENCIA MAGALI
apellido: CEPEDA
celular: 1126445577
fecha_nacimiento: 2002-09-12
genero: F
provincia: Buenos Aires
localidad: LAFERRERE
direccion: TEUCO 3900
*/

export function ModalEditClient({ success, onClose, body }: propForm) {
    const { register, setValue, handleSubmit } = useForm<GetClientDTO>()
    // Función que maneja el envío del formulario
    async function onSubmit(data: GetClientDTO) {
        /*  console.log(data); */ // Aquí se muestra el contenido del formulario cuando se envía
        try {
            // Crear un objeto con los datos del formulario
            const dataFinal: ClientDataUpdateDTO = formatClientDataUpdate(data)
            console.log(dataFinal)
            const formData = new URLSearchParams();
            //aca abajo es donde se rompe

            // Agregar los valores del formulario al URLSearchParams
            Object.keys(dataFinal).forEach((key) => {
                const value = dataFinal[key as keyof ClientDataUpdateDTO]; // Asegúrate de que el valor se ajusta al tipo correcto
                if (value !== undefined) {
                    formData.append(key, String(value)); // Convertimos el valor a string antes de agregarlo
                }
            });

            // Realizar la solicitud POST al servidor
            const res = await fetch(`${BaseUrl}/update_cliente`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData,
                credentials: 'include',  // Añadir las credenciales (si las necesitas)
                redirect: 'follow',  // Si es necesario para tu flujo
            });
            await res.text();
            if (res.ok) {
                toast.success('Cambios guardados correctamente')
                success()

            } else {
                // Manejo de errores si la respuesta del servidor no es OK
                toast.error('Hubo un error, inténtalo nuevamente ')
            }
        } catch (error) {
            console.error('Error en la actualización del cliente:', error);
            toast.error('Hubo un error, inténtalo nuevamente ')
        }
    }

    // Inicializar campos en useEffect con tipos y lógica para campos vacíos
    useEffect(() => {
        Object.keys(body).forEach((key) => {
            const typedKey = key as keyof GetClientDTO; // Aseguramos que la clave es del tipo correcto

            // Si la clave es 'date_nacimiento', usa formatDate
            if (typedKey === "date_nacimiento") {
                setValue(typedKey, formatDate(body[typedKey])); // Formatea solo la fecha de nacimiento
            } else {
                // Para los otros campos, asignamos el valor solo si no está vacío o undefined
                setValue(typedKey, body[typedKey] ?? ""); // Asigna una cadena vacía solo si es undefined o null
            }
        });
    }, [body, setValue]);

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
                        <h1 className="text-center mb-2 uppercase text-sm">Editar cliente N° <span className="text-colorMsjYellow">{body.id_cliente}</span></h1>
                        <form className="text-black text-xs uppercase" onSubmit={handleSubmit(onSubmit)}>
                            <ScrollContainer maxHeight="400px">
                                <div className="mb-4">
                                    <label className="block   text-white">N° De Documento</label>
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
                                    <label className="block   text-white">Nombre</label>
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
                                    <label className="block   text-white">Apellido</label>
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
                                    <label className="block mb-2   text-white ">Fecha de nacimiento</label>
                                    <input {...register('date_nacimiento')} type="date" name="date_nacimiento" id="date_nacimiento" defaultValue={formatDate(body.date_nacimiento)} placeholder="Desde DD-MM-AAAA" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
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
                                        className="w-full px-4 py-2 border border-gray-300  rounded-md"
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
                                        className="w-full px-4 py-2 border border-gray-300  rounded-md"
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
                                        className="w-full px-4 py-2 border border-gray-300  rounded-md"
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
                                        defaultValue={''}
                                        className="w-full px-4 py-2 border border-gray-300  rounded-md"
                                    />
                                </div>
                            </ScrollContainer>
                            <div className="  mt-4 flex justify-center">
                                <button type="submit" className="bg-colorRed rounded-md mx-2 px-8 py-3 w-full text-center  shadow-xl  flex justify-center items-center text-white" >Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}   
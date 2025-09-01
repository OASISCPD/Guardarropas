import { IoMdClose } from "react-icons/io";
import { ScrollContainer } from "../logic/ScrollContainer";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getUserSession } from "../../logic/user";
import { LoaderRegisterHoverMobile } from "../loaders/LoaderRegister";
import { BaseUrl } from "../../logic/api";
import { toast } from "react-toastify";


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
        <section className="fixed top-0 left-0 w-full h-full flex items-center justify-center  z-500">
            <div className="rounded-xl shadow-xl max-w-md w-full mx-4 md:mx-auto ">
                <div className=" bg-colorBlueComponents  rounded-md shadow min-h-60 ">
                    {loading == true && (
                        <LoaderRegisterHoverMobile />
                    )}
                    <div className="flex items-center justify-between p-4">
                        <button className="text-white bg-transparent   rounded-md text-sm h-8 w-8 ms-auto inline-flex justify-center items-center " onClick={onClose}>
                            <IoMdClose size={40} />
                        </button>
                    </div>
                    <h3 className="text-xl uppercase strokeWidth text-center text-white">Cargar Novedad</h3>
                    <div className="p-4">
                        <form className="text-black text-xs uppercase" onSubmit={handleSubmit(onSubmit)}>
                            <ScrollContainer maxHeight="300px">
                                <div className="mb-4">
                                    <label className="block mb-1  text-white">Usuario</label>
                                    <input
                                        {...register('user')}
                                        type="text"
                                        autoComplete='off'
                                        name="user"
                                        id='user'
                                        disabled
                                        value={user}
                                        className="w-full px-4 py-2 border border-gray-300  rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1  text-white">Mensaje</label>
                                    <textarea
                                        {...register('mensaje')}
                                        autoComplete='off'
                                        name="mensaje"
                                        id='mensaje'
                                        required
                                        defaultValue={''}
                                        className="w-full px-4 py-2 border border-gray-300  rounded-md"
                                    />
                                </div>
                            </ScrollContainer>
                            <div className="  mt-4 flex justify-center">
                                <button type="submit" className="bg-colorRed rounded-md mx-auto  py-2 w-1/2 text-center  shadow-xl  flex justify-center items-center text-white" >Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
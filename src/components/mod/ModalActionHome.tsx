import { IoMdClose } from "react-icons/io";
import { ScrollContainer } from "../logic/ScrollContainer";
import { useEffect, useState } from "react";
import { getRegisterById, getRegisterObjectForgottenById } from "../../logic/register";
import { GetRegisterByIdRegisterDTO, RegisterMovement } from "../../types/registers";
import { ModalLoadingTemplate } from "../news/CardLoading";
import { getTextColorForStateForgotten } from "../../logic/colors";
import { toast } from "react-toastify";
import { BaseUrl } from "../../logic/api";
import { LoaderRegisterHoverMobile } from "../loaders/LoaderRegister";

export interface FormDataDTO {
    prenda: string
}

export interface propForm {
    id: number
    onClose: () => void
    action: string
    onSuccess: () => void
}

/* traer_registro_x_id?id_registro=1771 */
export function ModalActionHome({ onClose, id, action, onSuccess }: propForm) {
    //loading del fetch
    const [loadingFetch, setLoadingFetch] = useState<boolean>(false)
    //input que maneja el estado nuevo para el detalle
    const [inputValue, setInputValue] = useState<string>("");
    //el loading se inizializa en false para que cargue siempre le modal primero caregando y despues printee la data
    const [loading, setLoading] = useState<boolean>(false)
    //constante q2ue almacena los valores a mostrar
    //function que me trae la data del registro en particular
    const [client, setClient] = useState<RegisterMovement>()
    async function getData() {
        setLoading(true)
        const data = await getRegisterById(id);
        console.log(data)
        if (!data) {
            console.log('no hay datos')
            return
        }
        setClient(data)
        setLoading(false)
    }
    //funcion que retira mi registro en caso de q el cliente quiera retirarlo
    async function registerRemove() {
        setLoadingFetch(true)
        console.log('RETIRAR', id)
        const formData = new FormData();
        formData.append('id_registro', id.toString());//pasar el valor a string

        const requestOptions: RequestInit = {
            method: "POST",
            credentials: 'include' as RequestCredentials,
            redirect: 'follow' as RequestRedirect,
            body: formData
        }
        try {
            const response = await fetch(`${BaseUrl}/retirar_registro`, requestOptions);
            if (!response.ok) {
                toast.error(response.statusText)
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            toast.success("Se ha retirado el registro con exito")
            onSuccess()
        } catch (error) {
            console.error(error)
            toast.error('Error al retirar el registro')
        } finally {
            setLoadingFetch(false)
        }
    }
    //function que pasa a olvidado mi registro en cuestion:
    async function registerForgotten() {
        setLoadingFetch(true)
        const requestOptions: RequestInit = {
            method: "GET",
            credentials: 'include' as RequestCredentials,
            redirect: 'follow' as RequestRedirect,
        }
        try {
            const response = await fetch(`${BaseUrl}/add_registro_olvidado?id_registro=${id}`, requestOptions);
            if (!response.ok) {
                toast.error(response.statusText)
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            toast.success("Se ha pasado a olvidados el registro");
            onSuccess()
        } catch (error) {
            console.error(error)
            toast.error("Error al pasar a olvidado el registro")
        } finally {
            setLoadingFetch(false)
        }
    }

    //funcion que guarda el valor del input de detalle:
    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setInputValue(value);
        console.log("Input value:", value);
    };
    //funcion que envia el detalle a la prenda
    async function changedDetailsInGarment(detalle: string, id_prenda: number) {
        setLoadingFetch(true)
        console.log(id_prenda)
        const formData = new FormData();
        formData.append('id_prenda', id_prenda.toString());//pasar el valor a string
        formData.append('detalle', detalle);//pasar el valor a string

        const requestOptions: RequestInit = {
            method: "POST",
            credentials: 'include' as RequestCredentials,
            redirect: 'follow' as RequestRedirect,
            body: formData
        }
        try {
            const response = await fetch(`${BaseUrl}/guardar_detalle_prenda`, requestOptions);
            if (!response.ok) {
                toast.error(response.statusText)
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            toast.success("Se ha actualizado el detalle de la prenda/objeto con exito")
            getData()
            /*  onSuccess() */
        } catch (error) {
            console.error(error)
            toast.error('Error al editar el detalle de la prenda/objeto')
        } finally {
            setLoadingFetch(false)
        }

    }
    //functino que me retira la prenda una por unapor id prenda no por el registro en general 
    async function removeGarmentById(id_prenda: number) {
        setLoadingFetch(true)
        console.log(id_prenda)
        const formData = new FormData();
        formData.append('id_prenda', id_prenda.toString());//pasar el valor a string
        formData.append('id_registro', id.toString());//pasar el valor a string

        const requestOptions: RequestInit = {
            method: "POST",
            credentials: 'include' as RequestCredentials,
            redirect: 'follow' as RequestRedirect,
            body: formData
        }
        try {
            const response = await fetch(`${BaseUrl}/retirar_prenda`, requestOptions);
            if (!response.ok) {
                toast.error(response.statusText)
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            toast.success("Se ha retirado la prenda/objeto con exito")
            getData()
            /*  onSuccess() */
        } catch (error) {
            console.error(error)
            toast.error('Error al retirar la prenda/objeto')
        } finally {
            setLoadingFetch(false)
        }
    }


    //use effect iniizaliza la funcion que me trae el movimiento del registro de ese id
    useEffect(() => {
        getData()
    }, [])

    return (
        <section className="fixed top-0 left-0 w-full h-full flex items-center justify-center  z-500">
            <div className="rounded-xl shadow-xl max-w-md w-full mx-4 md:mx-auto ">
                {loadingFetch && (
                    <LoaderRegisterHoverMobile />
                )}
                {loading ? (
                    <div className=" bg-colorGray  rounded-md shadow min-h-60 ">
                        <div className="flex items-center justify-between p-4">
                            {/* <h3 className="text-xl strokeWidth text-gray-900">{action}</h3> */}
                            <button className="text-white bg-transparent  hover:text-gray-900 rounded-md text-sm h-8 w-8 ms-auto inline-flex justify-center items-center " onClick={onClose}>
                                <IoMdClose size={40} />
                            </button>
                        </div>
                        <ModalLoadingTemplate />
                    </div>
                ) : (
                    <div className=" bg-colorGray  rounded-md shadow min-h-60 ">

                        <div className="flex items-center justify-between p-4">
                            {/* <h3 className="text-xl strokeWidth text-gray-900">{action}</h3> */}
                            <button className="text-white bg-transparent  hover:text-gray-900 rounded-md text-sm h-8 w-8 ms-auto inline-flex justify-center items-center " onClick={onClose}>
                                <IoMdClose size={40} />
                            </button>
                        </div>
                        <div className="p-4">
                            <div className="text-white text-xs uppercase" >
                                <ScrollContainer maxHeight="800px">
                                    {client ? (
                                        <div className="p-2 text-start">
                                            <h1 className="my-1 text-sm">Cliente: <span className=""> {client.apellido + ' ' + client.nombre}</span></h1>
                                            <h1 className="my-1 text-sm">DNI: <span className="text-colorMsjYellow">{client.n_documento}</span></h1>
                                            <div className="mt-2 text-xs">
                                                <ScrollContainer maxHeight="300px">
                                                    {action.toLowerCase() !== 'edit' ? (
                                                        client.prendas.map((garment, index) => (
                                                            <div className="p-2 my-2 border border-colorWhiteShadow  rounded-sm " key={index}>
                                                                <h1 className="my-1 text-colorYellow">{garment.tipo} N°{garment.numero}</h1>
                                                                <h1 className="my-1">OBJ: {garment.prenda}</h1>
                                                                <h1 className={`my-1 `}>ESTADO: <span className={`${getTextColorForStateForgotten(garment.estado_prenda)}`}>{garment.estado_prenda}</span></h1>

                                                                <h1 className="my-1">DETALLE: {garment.detalle ? garment.detalle : ' no tiene detalle'}</h1>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        client.prendas.map((garment, index) => (
                                                            <div className="p-2 my-2 border border-colorWhiteShadow  rounded-sm " key={index}>
                                                                <h1 className="my-1 text-colorYellow">{garment.tipo} N°{garment.numero}</h1>
                                                                <h1 className="my-1">OBJ: {garment.prenda}</h1>
                                                                <h1 className={`my-1 `}>ESTADO: <span className={`${getTextColorForStateForgotten(garment.estado_prenda)}`}>{garment.estado_prenda}</span></h1>

                                                                <h1 className="my-1">DETALLE: {garment.detalle ? garment.detalle : ' no tiene detalle'}</h1>
                                                                <input onChange={handleInputChange} placeholder="Ingresar el detalle del objeto/prenda" className="w-full px-4 py-2 border border-gray-300 text-black  rounded-md" type="text" />
                                                                <div className="w-full flex items-center ml-auto">
                                                                    <button onClick={() => changedDetailsInGarment(inputValue, garment.id_prenda)} className="bg-colorBlue my-3 w-1/3 flex justify-center items-center text-center py-2 rounded-md ml-auto text-white shadow-xl hover:scale-105 duration-150">Guardar</button>
                                                                    <button onClick={() => removeGarmentById(garment.id_prenda)} className="bg-colorRed my-3 w-1/3 flex justify-center items-center text-center py-2 rounded-md mx-2 text-white shadow-xl hover:scale-105 duration-150">Retirar</button>
                                                                </div>
                                                            </div>
                                                        ))
                                                    )}
                                                </ScrollContainer>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-8 bg-colorWhiteShadow bg-opacity-40">
                                            <h1 className="text-center text-black">No Hay Datos</h1>
                                        </div>
                                    )}

                                </ScrollContainer>
                                {action === 'withdraw' && (
                                    <button onClick={registerRemove} className="bg-colorRed my-3 w-1/2 flex justify-center items-center text-center py-2 rounded-md mx-auto text-white shadow-xl hover:scale-105 duration-150">Retirar</button>
                                )}
                                {action === 'forgotten' && (
                                    <button onClick={registerForgotten} className="bg-colorMsjYellow my-3 w-1/2 flex justify-center items-center text-center py-2 rounded-md mx-auto text-white shadow-xl hover:scale-105 duration-150">Pasar a objetos olvidados</button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

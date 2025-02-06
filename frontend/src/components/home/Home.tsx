import { CardSearch } from './CardSearch'
import { CardClientSelect } from './CardClientSelect'
import { Navbar } from '../Navbar'
import { ButtonSendForm } from './ButtonSendForm'
import Registers from './Registers'
import { useState } from 'react'
import { ClientSelectDTO } from '../../types/client'
import { CardBoxes } from './CardBoxes'
import { toast } from 'react-toastify'
import { FormDataDTO } from '../mod/ModalBoxesForm'
import { BaseUrl } from '../../logic/api'
import { CardHangers } from './CardHangers'
import { CardUmbrellas } from './CardUmbrellas'
import { useMediaQuery } from 'react-responsive'
import { LoaderRegisterHoverMobile } from '../loaders/LoaderRegister'

export interface typeStorage {
    id_lugar: number
    prenda: string
}

export function Home() {
    //loading hover para los fetching
    const [loading, setLoading] = useState<boolean>(false);
    const isDesktop = useMediaQuery({ minWidth: 1024 })
    //constante q muestra el usuario seleccionado
    const [userSelect, setUserSelect] = useState<ClientSelectDTO>()
    //constante que almacenaria los valores seleccionados de las perchas
    const [hangers, setHangers] = useState<typeStorage[]>([])
    //constante que almacenaria los valores seleccionados de los boxes
    const [boxes, setBoxes] = useState<typeStorage[]>([])
    //constante que almacenaria los valores seleccionados de los paraguas
    const [umbrella, setUmbrella] = useState<typeStorage[]>([])

    function removeIdFront(data: FormDataDTO[]): Omit<FormDataDTO, "id_front">[] {
        return data.map(({ id_front, ...rest }) => rest);
    }
    //booleano que limpia mi modulo
    /* const [fetch] */
    //funcion que me limpia todo el modulo y me llama a lo que tenga que consumir para q no se recargue la pagina

    function clearModule() {
        window.location.reload()
        setBoxes([])
        setUmbrella([])
        setHangers([])
        setUserSelect({ client: '', dni: '', id_cliente: 0, id_usuario: 0, phone: '' })
    }

    async function send() {
        setLoading(true)
        console.log('DATA A JUNTAR EN OTRO FORMATO: ', hangers, boxes, umbrella)

        const body: any[] = [
            ...hangers,
            ...boxes,
            ...umbrella
        ];
        //aca iria la validacion de si la combinacion de la fusion de mis 3 arrays en su punto leng es menor que 0 entonces no hay nada cargado aun 
        const garment = removeIdFront(body)
        console.log('data del storage a enviar', garment)

        console.log(userSelect)
        if (userSelect && userSelect.dni !== '' && userSelect.client !== '') {
            if (garment.length <= 0) {
                toast.error('Debes agregar alguna prenda/objeto')
                setLoading(false)
                return
            }
            console.log('entra a la funcio para enviar el send')
            var raw = JSON.stringify({
                id_cliente: userSelect.id_cliente,
                observacion: "ninguna",
                id_registro: userSelect.id_usuario,
                prendas: garment,
            });
            try {
                const response = await fetch(`${BaseUrl}/add_prenda`, { method: 'POST', body: raw, credentials: 'include' as RequestCredentials, redirect: 'follow' as RequestRedirect, mode: 'cors' as RequestMode })
                if (!response.ok) {
                    throw new Error("ERROR")
                }
                await response.text()
                toast.success("Registro Agregado Correctamente")
                setTimeout(() => {
                    window.open(`/printTicket`, "_blank");
                }, 1500);
                setTimeout(() => {
                    clearModule()
                }, 1700);


            } catch (error) {
                console.error(error)
                toast.error(`${error}`)
            } finally {
                setLoading(false)
            }
            return
        }
        console.log('debe seleccionar un cliente')
        toast.error('Debes seleccionar un cliente...')
        setLoading(false)

    }

    return (
        <div className="min-h-screen  text-white">
            {loading && (
                <LoaderRegisterHoverMobile />
            )}
            {!isDesktop && (
                < Navbar />
            )}

            {/* CARD SEARCH */}
            <CardSearch setUserSelect={setUserSelect} />
            {userSelect !== null && userSelect !== undefined && userSelect.dni !== '' && (
                <CardClientSelect setUserSelect={setUserSelect} dni={userSelect.dni} name={userSelect.client} phone={userSelect.phone} />
            )}
            {/* CARDS */}
            <div className="p-4 lg:flex lg:flex-row lg:justify-center item">
                <div className='lg:m-1 lg:w-1/3'>
                    <CardBoxes setDataBox={setBoxes} />
                </div>
                <div className='lg:m-1 lg:w-1/3'>
                    <CardHangers setDataHanger={setHangers} />
                </div>
                <div className='lg:m-1 lg:w-1/3'>
                    <CardUmbrellas setDataUmbrella={setUmbrella} />
                </div>
            </div>
            {/* BUTTON QUE ENVIA EL FORM CON TODOS LOS VALORES YA ESTABLECIDOS */}
            <ButtonSendForm send={send} />
            {/* LISTA DE REGISTROS */}
            <Registers />
        </div>
    )
}

{/*   <div className="mb-2 bg-colorGray rounded-md p-4">
                    <h2 className="text-lg font-semibold mb-3">📦 BOXES</h2>
                    <ScrollContainer maxHeight='400px'>
                        <div className="grid grid-cols-6  gap-2">
                            {[...Array(90)].map((_, i) => (
                                <button
                                    key={i}
                                    className="aspect-square bg-colorGreen rounded flex items-center justify-center text-xl font-medium hover:bg-green-600 transition-colors"
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </ScrollContainer>
                </div>
                <div className='bg-colorGray rounded-md p-4 mb-2'>
                    <h2 className="text-lg font-semibold mb-3">👔 PERCHAS</h2>
                    <ScrollContainer maxHeight='400px'>
                        <div className="grid grid-cols-6  gap-2">
                            {[...Array(50)].map((_, i) => (
                                <button
                                    key={i}
                                    className="aspect-square bg-colorGreen rounded flex items-center justify-center text-xl font-medium hover:bg-green-600 transition-colors"
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </ScrollContainer>

                </div>

                <div className='bg-colorGray rounded-md p-4 mb-2'>
                    <h2 className="text-lg font-semibold mb-3">👔 PARAGUAS</h2>
                    <ScrollContainer maxHeight='400px'>
                        <div className="grid grid-cols-6  gap-2">
                            {[...Array(80)].map((_, i) => (
                                <button
                                    key={i}
                                    className="aspect-square bg-colorGreen rounded flex items-center justify-center text-xl font-medium hover:bg-green-600 transition-colors"
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </ScrollContainer>
                </div> */}


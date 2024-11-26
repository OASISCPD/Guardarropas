import { CardSearch } from './CardSearch'
import { ScrollContainer } from '../../logic/ScrollContainer'
import { CardClientSelect } from './CardClientSelect'
import { Navbar } from '../Navbar'
import { ButtonSendForm } from './ButtonSendForm'
import Registers from './Registers'
import { useState } from 'react'
import { ClientSelectDTO } from '../../../types/Client'



export function HomeMobile() {
    //constante q muestra el usuario seleccionado
    const [userSelect, setUserSelect] = useState<ClientSelectDTO>()

    function send() {
        if (userSelect?.dni !== '' && userSelect?.client !== '') {
            console.log('entra a la funcio para enviar el send')
            return
        }
        console.log('debe seleccionar un cliente')

    }
    return (
        <div className="min-h-screen  text-white">
            {/* NAVBAR */}
            <Navbar />
            {/* CARD SEARCH */}
            <CardSearch setUserSelect={setUserSelect} />
            {userSelect !== null && userSelect !== undefined && userSelect.dni !== '' && (
                <CardClientSelect setUserSelect={setUserSelect} dni={userSelect.dni} name={userSelect.client} phone={userSelect.phone} />
            )}
            {/* CARDS */}
            <div className="p-4">
                <div className="mb-2 bg-colorGray rounded-md p-4">
                    <h2 className="text-lg font-semibold mb-3">📦 BOXES</h2>
                    <ScrollContainer maxHeight='400px'>
                        <div className="grid grid-cols-8 gap-2">
                            {[...Array(90)].map((_, i) => (
                                <button
                                    key={i}
                                    className="aspect-square bg-colorGreen rounded flex items-center justify-center text-sm font-medium hover:bg-green-600 transition-colors"
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
                        <div className="grid grid-cols-8 gap-2">
                            {[...Array(50)].map((_, i) => (
                                <button
                                    key={i}
                                    className="aspect-square bg-colorGreen rounded flex items-center justify-center text-sm font-medium hover:bg-green-600 transition-colors"
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
                        <div className="grid grid-cols-8 gap-2">
                            {[...Array(80)].map((_, i) => (
                                <button
                                    key={i}
                                    className="aspect-square bg-colorGreen rounded flex items-center justify-center text-sm font-medium hover:bg-green-600 transition-colors"
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </ScrollContainer>
                </div>
            </div>
            {/* BUTTON QUE ENVIA EL FORM CON TODOS LOS VALORES YA ESTABLECIDOS */}
            <ButtonSendForm send={send} />
            {/* LISTA DE REGISTROS */}
            <Registers />

        </div>
    )
}


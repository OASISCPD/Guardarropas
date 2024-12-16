import { LuLock } from "react-icons/lu"
import { ScrollContainer } from "../logic/ScrollContainer"
import { BsUpcScan } from "react-icons/bs"
import { FaSearch } from "react-icons/fa"
import { GetRegisterDTO } from "../../types/registers"
import { useEffect, useState } from "react"
import { getRegisterByDni, getRegisters } from "../../logic/register"
import { sendDataClient } from "../../types/client"
import { stringProccess } from "../../logic/clients"
import { LoaderRegisterMobile } from "../loaders/LoaderRegister"
import { CardNoData } from "../cards/CardNoData"
import { Modal } from "../logic/Modal"
import { typeModalHome } from "../../types/modal"
import { ModalActionHome } from "../mod/ModalActionHome"





export default function Registers() {
    const [dni, setDni] = useState<string | number>('')

    //constante que almacena los valores de la ruta traer_registros
    const [registers, setRegisters] = useState<GetRegisterDTO[]>()
    //loading
    const [loading, setLoading] = useState<boolean>(false)
    //variable que maneja el tiempo de timoeut y q no se mande hasta que se deje de tipear
    const [debouncedScanValue, setDebouncedScanValue] = useState('');

    //modal para los 3 tipos de acciones
    const [modal, setModal] = useState<typeModalHome>()
    async function getData() {
        setLoading(true)
        try {
            const data = await getRegisters();
            if (!data) {
                setRegisters([])
                return
            }
            setRegisters(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    async function getByDni(dni: string | number) {
        setLoading(true)
        try {
            const data = await getRegisterByDni(dni);
            if (!data) {
                setRegisters([])
                return
            }
            setRegisters(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    function handleScanChange(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target.value)
        //llamamos a la funcion que retorna el value de la cadena del dni 
        const data: sendDataClient | null = stringProccess(e.target.value)
        if (!data) {
            setDni('')
            return
        }
        setDni(data.dni)
        console.log(data)
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const trimmedValue = e.target.value.trim(); // Elimina espacios innecesarios
        console.log('DNI CAMPO DEL INPUT:', trimmedValue);
        // Actualiza siempre el estado, incluso si está vacío
        setDni(trimmedValue);

        // Opcional: Mensaje para depuración
        if (trimmedValue === "") {
            console.log("DNI VACÍO desde el padre.");
            setDni('')
        }
    }

    function openModal(data: typeModalHome) {
        setModal({ action: data.action, id: data.id, state: data.state })
    }
    function closeModal() {
        setModal({ action: '', id: 0, state: false })
    }
    function onSuccessClose() {
        setModal({ action: '', id: 0, state: false })
        getData()
    }

    useEffect(() => {
        // Llama a la función siempre que `debouncedScanValue` cambie
        getByDni(dni)
    }, [debouncedScanValue]);

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        setLoading(true)
        console.log('dni casmbio de valores:', dni)
        const timer = setTimeout(() => {
            if (!dni || dni.toString().trim() === "") {
                console.log("DNI vacío desde el padre recibido en el hijo.");
                getData()
                return
            }
            // Si el valor de `dni` está vacío, actualiza `debouncedScanValue` para reflejarlo
            setDebouncedScanValue(dni.toString())
        }, 1000)

        return () => {
            clearTimeout(timer)
        }
    }, [dni])

    return (
        <div className="mt-4  text-xs sm:text-sm">
            {/* Header */}
            <header className=" p-4">
                <div className="flex items-center gap-2 text-white mb-4">
                    <LuLock size={16} className=" text-colorOrange" />
                    <h1 className="text-sm lg:text-base tracking-widest">REGISTROS</h1>
                </div>
                <div className="flex justify-between lg:justify-start gap-2 my-3 text-sm">

                    <div className="flex relative w-full lg:w-1/4">
                        <input
                            onChange={handleScanChange}
                            type="text"
                            id="scan"
                            name="scan"
                            autoComplete="off"
                            placeholder="Escanear DNI"
                            className="w-full px-4 py-2 lg:py-1 placeholder:text-white  rounded-md flex items-center gap-2 bg-colorBlue "
                        />
                        <BsUpcScan size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white" />
                    </div>
                    <div className="flex relative w-full lg:w-1/4">
                        <input
                            onChange={handleInputChange}
                            value={dni}
                            id="dni"
                            name="dni"
                            type="text"
                            autoComplete="off"
                            placeholder="Buscar DNI"
                            className="w-full px-4 py-2 lg:py-1 rounded-md flex items-center gap-2 bg-white text-gray-900 "
                        />
                        <FaSearch size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                </div>
            </header>
            {/* Records List */}
            <div className="p-4">
                <ScrollContainer maxHeight="400px">
                    {loading ? (
                        <LoaderRegisterMobile />
                    ) : registers && registers.length > 0 ? (
                        <table className="min-w-full text-center">
                            <thead>
                                <tr className="text-xs uppercase">
                                    <td className="py-4 px-4 whitespace-nowrap">ID</td>
                                    <td className="py-4 px-4 whitespace-nowrap">Fecha y Hora Ingreso</td>
                                    <td className="py-4 px-4 whitespace-nowrap">DNI</td>
                                    <td className="py-4 px-4 whitespace-nowrap">Apellido y Nombre</td>
                                    <td className="py-4 px-4 whitespace-nowrap">Lugar</td>
                                    <td className="py-4 px-4 whitespace-nowrap"></td>
                                </tr>
                            </thead>
                            <tbody className="bg-colorGray rounded-md text-xs uppercase">
                                {registers.map((register) => (
                                    <tr key={register.id_registro}>
                                        <td className="py-2 px-4">{register.id_registro}</td>
                                        <td className="py-2 px-4">{register.datetime_ingreso}</td>
                                        <td className="py-2 px-4">{register.n_documento}</td>
                                        <td className="py-2 px-4">{register.apellido_nombre}</td>
                                        <td className="py-2 px-4 uppercase">{register.lugares_ocupados}</td>
                                        <td className="py-2 px-4 flex items-center justify-between">
                                            <button
                                                onClick={() => openModal({ action: 'edit', id: register.id_registro, state: true })}
                                                className="bg-colorBlue hover:bg-blue-800 hover:scale-105 duration-100 text-white px-6 py-1 rounded-md"
                                            >
                                                EDITAR
                                            </button>
                                            <button
                                                onClick={() => openModal({ action: 'withdraw', id: register.id_registro, state: true })}
                                                className="bg-colorRed hover:bg-red-600 hover:scale-105 duration-100 text-white px-6 py-1 rounded-md mx-2"
                                            >
                                                RETIRAR
                                            </button>
                                            <button
                                                onClick={() => openModal({ action: 'forgotten', id: register.id_registro, state: true })}
                                                className="bg-colorYellow hover:bg-yellow-600 hover:scale-105 duration-100 text-white px-3 py-1 rounded-md"
                                            >
                                                OLVIDADO
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <CardNoData type="home" />
                    )}
                </ScrollContainer>
            </div>
            {modal && modal.state && modal.action !== '' && (
                <Modal isOpen={true} onClose={closeModal}>
                    <ModalActionHome onSuccess={onSuccessClose} action={modal.action} id={modal.id} onClose={closeModal} />
                </Modal>
            )}
        </div>
    )
}

/* 

 <h1 className="min-w-[100px]">ID</h1>
                        <h1 className="min-w-[200px]">FECHA Y HORA INGRESO</h1>
                        <h1 className="min-w-[150px]">DNI</h1>
                        <h1 className="min-w-[250px]">APELLIDO Y NOMBRE</h1>
                        <h1 className="min-w-[200px]">LUGAR</h1>
                        <h1 className="min-w-[150px]">ACCIONES</h1>
*/
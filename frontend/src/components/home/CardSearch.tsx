import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsUpcScan } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { ClientTable } from "./ClientTable";
import { InfoColors } from "./InfoColors";
import { ClientSelectDTO, ScanerDTO, sendDataClient } from "../../types/client";
import { stringProccess } from "../../logic/clients";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";
/* import { useMediaQuery } from "react-responsive";
 */
type SearchDTO = {
    scan: string
    dni: string | number
}

interface propCard {
    setUserSelect: React.Dispatch<React.SetStateAction<ClientSelectDTO | undefined>>;
}
export function CardSearch({ setUserSelect }: propCard) {
    //desktop resolution
    const isDesktop = useMediaQuery({ minWidth: 1024 })

    //armar body de los datos que tomo el scanner
    const [body, setBody] = useState<ScanerDTO>()
    const { register, setValue } = useForm<SearchDTO>()
    const [dniValue, setDniValue] = useState<string | number>("");
    const [scanValue, setScanValue] = useState<string>("");
    const [debouncedScanValue, setDebouncedScanValue] = useState('');//variable que maneja el tiempo de timoeut y q no se mande hasta que se deje de tipear

    const handleDniChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDniValue(e.target.value);
    };

    const handleScanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setScanValue(e.target.value);
    };

    //function que guarda el valor selecciono
    function getClient(dni: number | string, lastName: string, name: string, phone: string | number, id_cliente: number, id_usuario: number) {
        console.log(dni, lastName, name, phone)
        toast.success('Se agrego el cliente correctamente...')
        setUserSelect({ client: lastName + ' ' + name, dni: dni, phone: phone, id_cliente: id_cliente, id_usuario: id_usuario })
        setDniValue('')
        setValue('dni', '')
        setScanValue('')
        setValue('scan', '')
    }

    //funcion que comprime mi valor de scanner y transforma la data recibida
    function getDataScan() {
        setTimeout(() => {
            console.log('valores tomados del scanner', scanValue)
            const data: sendDataClient | null = stringProccess(scanValue)
            console.log('DATA OBTENIDA DEL DNI', data)
            setDniValue(data?.dni || '')
            setValue('dni', data?.dni || '')
            if (data) {
                setBody({ apellido: data.lastName, fecha_nacimiento: data.date, genero: data.gender, n_documento: data.dni, nombre: data.name })
            }
        }, 500);
    }

    // Llamada a la función cada vez que el valor "debouncedScanValue" cambia
    useEffect(() => {
        if (debouncedScanValue) {
            getDataScan();
        }
    }, [debouncedScanValue]);



    // Este useEffect gestiona el debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            if (scanValue) {
                setDebouncedScanValue(scanValue); // Usar el valor de scan si existe
            } else if (dniValue) {
                /* setDebouncedScanValue(dniValue.toString()); */ // Usar el valor de dni si no hay scanValue
                setValue('dni', dniValue)
                setBody({ apellido: '', fecha_nacimiento: '', genero: '', nombre: '', n_documento: dniValue })
            }
        }, 1000);

        // Limpiar el timeout cuando cambie alguno de los valores antes de los 1000ms
        return () => {
            clearTimeout(timer);
        };
    }, [scanValue, dniValue]);



    return (
        <div className="p-4">
            <div className="bg-colorBlueComponents rounded-md p-4 lg:flex lg:flex-wrap lg:justify-between lg:items-center">
                <h1 className="text-xl ">Asignar cliente</h1>
                <div className="flex justify-between 2xl:w-1/2  gap-2 mt-3 mb-2 text-sm">
                    <div className="flex lg:flex-col items-center relative w-full">
                        <input
                            autoComplete="off"
                            {...register('scan')}
                            id="scan"
                            name="scan"
                            type="text"
                            placeholder="Escanear DNI"
                            className="w-full px-4 py-2 lg:py-1 placeholder:text-white  rounded-md flex items-center gap-2 bg-colorBlue "
                            onChange={handleScanChange}
                        />
                        <BsUpcScan size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white" />
                    </div>
                    <div className="flex lg:flex-col items-center relative w-full">
                        <input {...register('dni')}
                            autoComplete="off"
                            id="dni"
                            name="dni"
                            type="text"
                            placeholder="Buscar DNI"
                            className="w-full px-4 py-2 lg:py-1 rounded-md flex items-center gap-2 bg-white text-gray-900 "
                            onChange={handleDniChange}
                        />
                        <FaSearch size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        {isDesktop && (
                            dniValue !== undefined && dniValue !== '' && body && (
                                <ClientTable body={body} clickClient={getClient} />
                            )
                        )}
                    </div>
                </div>
                {dniValue !== undefined && dniValue !== '' && body && !isDesktop && (
                    <ClientTable body={body} clickClient={getClient} />
                )}
                <InfoColors />
            </div>
        </div>
    )
}
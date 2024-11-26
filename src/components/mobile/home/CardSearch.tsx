import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsUpcScan } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { ClientTable } from "./ClientTable";
import { ClientSelectDTO } from "../../../types/Client";
import { InfoColors } from "./InfoColors";

type SearchDTO = {
    scan: string
    dni: string | number
}

interface propCard {
    setUserSelect: React.Dispatch<React.SetStateAction<ClientSelectDTO | undefined>>;
}
export function CardSearch({ setUserSelect }: propCard) {

    const { register, setValue } = useForm<SearchDTO>()
    const [dniValue, setDniValue] = useState<string | number>("");
    const [scanValue, setScanValue] = useState<string>("");

    const handleDniChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDniValue(e.target.value);
    };

    const handleScanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setScanValue(e.target.value);
    };

    //function que guarda el valor selecciono
    function test(dni: number | string, lastName: string, name: string, phone: string | number) {
        console.log(dni, lastName, name, phone)
        setUserSelect({ client: lastName + name, dni: dni, phone: phone })
        setDniValue('')
        setValue('dni', '')
    }
    useEffect(() => {

        if (dniValue !== undefined) {
            console.log(dniValue); // Imprime el valor cada vez que cambia
            console.log(scanValue); // Imprime el valor cada vez que cambia
        }
    }, [dniValue]);
    return (
        <div className="p-4">
            <div className="bg-colorGray rounded-md p-4 ">
                <h1 className="text-xl font-semibold">Asignar cliente</h1>
                <div className="flex justify-between gap-2 mt-3 mb-2 text-sm">
                    <div className="flex relative">
                        <input
                            autoComplete="off"
                            {...register('scan')}
                            id="scan"
                            name="scan"
                            type="text"
                            placeholder="Escanear DNI"
                            className="w-full px-4 py-2 placeholder:text-white  rounded-md flex items-center gap-2 bg-colorBlue "
                            onChange={handleScanChange}
                        />
                        <BsUpcScan size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white" />
                    </div>
                    <div className="flex relative">
                        <input {...register('dni')}
                            autoComplete="off"
                            id="dni"
                            name="dni"
                            type="text"
                            placeholder="Buscar DNI"
                            className="w-full px-4 py-2 rounded-md flex items-center gap-2 bg-white text-gray-900 "
                            onChange={handleDniChange}
                        />
                        <FaSearch size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                </div>
                {/* ACA IRIA LA LISTA  */}
                {dniValue !== undefined && dniValue !== '' && (
                    <ClientTable clickClient={test} />
                )}
                <InfoColors />
            </div>
        </div>
    )
}
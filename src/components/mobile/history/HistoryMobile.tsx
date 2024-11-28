import { FaSearch } from "react-icons/fa";
import { Navbar } from "../Navbar";
import { BsUpcScan } from "react-icons/bs";
import { ListRegister } from "./ListRegister";
import { ExportHistorial } from "../../buttons/ExportHistorial";
import { useState } from "react";
import { sendDataClient } from "../../../types/client";
import { RiFileHistoryLine } from "react-icons/ri";
import { stringProccess } from "../../../logic/clients";

export function HistoryMobile() {
    const [dni, setDni] = useState<string | number>('')

    function handleScanChange(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target.value)
        //llamamos a la funcion que retorna el value de la cadena del dni 
        const data: sendDataClient | null = stringProccess(e.target.value)
        if (!data) {
            setDni('')
            return
        }
        setDni(data.dni)
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

    return (
        <div>
            <Navbar />
            <div className=" p-4 text-sm">
                <div className="flex items-center gap-2">
                    <RiFileHistoryLine className="text-colorOrange" size={20} />
                    <h1 className="text-xl uppercase tracking-widest">HISTORIAL</h1>
                </div>
                <div className="flex justify-between  gap-2 mt-3 mb-2 ">
                    <div className="flex relative">
                        <input
                            autoComplete="off"
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
                        <input
                            autoComplete="off"
                            id="dni"
                            name="dni"
                            value={dni}
                            type="text"
                            placeholder="Buscar DNI"
                            className="w-full px-4 py-2 rounded-md flex items-center gap-2 bg-white text-gray-900 "
                            onChange={handleInputChange}
                        />
                        <FaSearch size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                </div>
            </div>
            <ExportHistorial />
            {/* LISTA DE HISTORICOS PARA MAPEAR */}
            <ListRegister dni={dni} />
        </div>
    )
}
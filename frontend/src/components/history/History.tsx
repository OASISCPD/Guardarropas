import { FaSearch } from "react-icons/fa";
import { BsUpcScan } from "react-icons/bs";
import { ListRegister } from "./ListRegister";
import { ExportHistorial } from "../buttons/ExportHistorial";
import { useState } from "react";
import { sendDataClient } from "../../types/client";
import { RiFileHistoryLine } from "react-icons/ri";
import { stringProccess } from "../../logic/clients";
import { StyleInputScan, StyleInputSearch } from "../../utils/style";



export function History() {
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
            <div className="p-4 text-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                        <RiFileHistoryLine className="text-colorOrange" size={20} />
                    </div>
                    <div>
                        <h1 className="text-xl font-medium text-slate-100 uppercase tracking-wide">Historial</h1>
                        <p className="text-xs text-slate-400">Consulta registros históricos por DNI</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                    <div className="flex relative group">
                        <input
                            autoComplete="off"
                            id="scan"
                            name="scan"
                            type="text"
                            placeholder="Escanear DNI"
                            className={StyleInputScan}
                            onChange={handleScanChange}
                        />
                        <BsUpcScan size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-colorOrange transition-colors duration-200" />
                    </div>

                    <div className="flex relative group">
                        <input
                            autoComplete="off"
                            id="dni"
                            name="dni"
                            value={dni}
                            type="text"
                            placeholder="Buscar DNI manualmente"
                            className={StyleInputSearch}
                            onChange={handleInputChange}
                        />
                        <FaSearch size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                    </div>
                </div>
            </div>
            <ExportHistorial />
            {/* LISTA DE HISTORICOS PARA MAPEAR */}
            <ListRegister dni={dni} />
        </div>
    )
}
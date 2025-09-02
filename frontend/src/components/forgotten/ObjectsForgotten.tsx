import { LuBrain } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { ListRegisterObjectsForgotten } from "./ListRegisterObjectsForgotten";
import { ReloadPageButton } from "../buttons/ReloadPage";
import { StyleInputSearch } from "../../utils/style";
import { FiFilter, FiCheckCircle, FiXCircle } from "react-icons/fi";

export function ObjectsForgotten() {
    const [dni, setDni] = useState<string>('')
    const [filter, setFilter] = useState<boolean>(true)

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value; // Elimina espacios innecesarios
        console.log('DNI CAMPO DEL INPUT:', value);
        // Actualiza siempre el estado, incluso si está vacío
        setDni(value);
        // Opcional: Mensaje para depuración
        if (value === "") {
            console.log("DNI VACÍO desde el padre.");
            setDni('')
        }
    }

    useEffect(() => {
        console.log('VALORES DEL BOOLEANO--->', filter)
    }, [filter])

    return (
        <div className="p-4   text-xs">
            {/* HEADER */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                    <LuBrain className="text-colorOrange" size={20} />
                </div>
                <div>
                    <h1 className="text-xl font-medium text-slate-100 uppercase tracking-wide">Objetos Olvidados</h1>
                    <p className="text-xs text-slate-400">Gestión de objetos perdidos por clientes</p>
                </div>
            </div>

            {/* SEARCH AND FILTERS SECTION */}
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-4 mb-4">
                {/* Search Section */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                        <FaSearch className="w-4 h-4 text-slate-400" />
                        <h2 className="text-sm font-medium text-slate-300">Buscar objetos</h2>
                    </div>
                    <div className="flex relative max-w-md">
                        <input
                            autoComplete="off"
                            id="name"
                            name="name"
                            value={dni}
                            type="text"
                            placeholder="Nombre del cliente o DNI..."
                            className={StyleInputSearch}
                            onChange={handleInputChange}
                        />
                        <FaSearch size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                </div>

                {/* Filter Buttons Section */}
                <div className="border-t border-slate-700 pt-4">
                    <div className="flex items-center gap-2 mb-3">
                        <FiFilter className="w-4 h-4 text-slate-400" />
                        <h2 className="text-sm font-medium text-slate-300">Filtrar por estado</h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setFilter(true)}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${filter
                                ? 'bg-green-600 text-white border border-green-500 shadow-lg scale-105'
                                : 'bg-slate-700 text-slate-300 border border-slate-600 hover:bg-slate-600 hover:text-slate-200'
                                }`}
                        >
                            <FiCheckCircle className="w-4 h-4" />
                            Activos
                            {filter && (
                                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                            )}
                        </button>

                        <button
                            onClick={() => setFilter(false)}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${!filter
                                ? 'bg-red-600 text-white border border-red-500 shadow-lg scale-105'
                                : 'bg-slate-700 text-slate-300 border border-slate-600 hover:bg-slate-600 hover:text-slate-200'
                                }`}
                        >
                            <FiXCircle className="w-4 h-4" />
                            Inactivos
                            {!filter && (
                                <div className="w-2 h-2 bg-red-300 rounded-full animate-pulse"></div>
                            )}
                        </button>
                    </div>
                    {/* Status indicator */}
                    <div className="mt-3 text-xs text-slate-500">
                        Mostrando objetos: {filter ? 'Activos (pendientes de retiro)' : 'Inactivos (retirados o donados)'}
                    </div>
                </div>
                {/* Reload Button */}
                <div className="pt-3 border-t  border-slate-700 mt-4">
                    <ReloadPageButton />
                </div>
            </div>

            {/* LIST */}
            <ListRegisterObjectsForgotten dni={dni} state={filter} />
        </div>
    )
}
import { LuBrain } from "react-icons/lu";
import { Navbar } from "../Navbar";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { ListRegisterObjectsForgotten } from "./ListRegisterObjectsForgotten";
import { ReloadPageButton } from "../buttons/ReloadPage";
import { useMediaQuery } from "react-responsive";

export function ObjectsForgotten() {
    //resolution
    const isDesktop = useMediaQuery({ minWidth: 1024 })
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
        <div>
            {!isDesktop && (
                <Navbar />
            )}
            <div className="p-4 text-xs">
                {/* HEADER */}
                <div className="flex items-center gap-2 my-2">
                    <LuBrain className="text-colorOrange" size={20} />
                    <h1 className="text-xl uppercase tracking-widest">objetos olvidados</h1>
                </div>

                {/* SEARCH BY DATE AND LOAD FORGOTEN */}
                <h1 className="mb-2 text-sm text-colorCardUser">Buscar</h1>
                <div className="gap-3 mb-4">
                    <div className="flex relative col-span-2">
                        <input
                            autoComplete="off"
                            id="name"
                            name="name"
                            value={dni}
                            type="text"
                            placeholder="Nombre del objeto..."
                            className="w-full lg:w-1/3 px-4 py-2 rounded-md flex items-center gap-2 bg-white text-gray-900 "
                            onChange={handleInputChange}
                        />
                        <FaSearch size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                </div>
                {/* SELECT FILTER */}
                <div className="flex items-center">
                    <h1 className="uppercase">Filtrar por:</h1>
                    <select
                        className="px-8 uppercase text-black rounded-sm mx-4 py-1"
                        value={filter ? 1 : 0} // Usa 1 o 0
                        onChange={(e) => setFilter(Number(e.target.value) === 1)} // Convierte de número a booleano
                    >
                        <option value={1}>ACTIVO</option>
                        <option value={0}>INACTIVO</option>
                    </select>
                </div>

                <ReloadPageButton />
                <ListRegisterObjectsForgotten dni={dni} state={filter} />
            </div>
        </div>
    )
}
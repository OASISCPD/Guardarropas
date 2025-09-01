import { FaRegUser, FaSearch } from "react-icons/fa";
import { Navbar } from "../Navbar";
import { ListClientsRegister } from "./ListClientsRegister";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { StyleInputSearch } from "../../utils/style";

export function Clients() {
    const isDesktop = useMediaQuery({ minWidth: 1024 })
    const [dni, setDni] = useState<string | number>('')

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
        <div className="min-h-screen text-white">

            <div className="p-4">
                {/* HEADER */}
                <div className="flex items-center gap-2">
                    <FaRegUser className="text-colorOrange" size={20} />
                    <h1 className="text-xl uppercase tracking-widest">ABM CLIENTES</h1>
                </div>
                {/* INPUTS */}
                <div className=" mt-3 mb-2  text-sm">
                    <div className="flex relative lg:w-1/3">
                        <input
                            autoComplete="off"
                            id="dni"
                            name="dni"
                            value={dni}
                            type="text"
                            placeholder="Buscar por DNI"
                            className={StyleInputSearch}
                            onChange={handleInputChange}
                        />
                        <FaSearch size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                </div>
            </div>
            <ListClientsRegister dni={dni} />
        </div>
    )
}
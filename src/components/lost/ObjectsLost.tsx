import { Navbar } from "../Navbar";
import { ButtonAddObject } from "./ButtonAddObject";
import { FaRegQuestionCircle, FaSearch } from "react-icons/fa";
import { ListRegisterObjects } from "./ListRegisterObjects";
import { useEffect, useState } from "react";
import { ReloadPageButton } from "../buttons/ReloadPage";
import { useMediaQuery } from "react-responsive";

export function ObjectsLost() {
    //resolution
    const isDesktop = useMediaQuery({ minWidth: 1024 })
    const [name, setName] = useState<string>('')
    const [filter, setFilter] = useState<boolean>(true)
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value; // Elimina espacios innecesarios
        console.log('DNI CAMPO DEL INPUT:', value);
        // Actualiza siempre el estado, incluso si está vacío
        setName(value);

        // Opcional: Mensaje para depuración
        if (value === "") {
            console.log("DNI VACÍO desde el padre.");
            setName('')
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
                {/*  HEADER*/}
                <div className="flex items-center gap-2 my-2">
                    <FaRegQuestionCircle className="text-colorOrange" size={20} />
                    <h1 className="text-xl uppercase tracking-widest">objetos perdidos</h1>
                </div>
                {/* SEARCH BY DATE AND LOAD NEW NEWS */}
                <h1 className="mb-2 text-sm text-colorCardUser">Buscar</h1>
                <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="flex relative col-span-2 lg:col-span-1">
                        <input
                            autoComplete="off"
                            id="name"
                            name="name"
                            value={name}
                            type="text"
                            placeholder="Nombre del objeto..."
                            className="w-full px-4 py-2 rounded-md flex items-center gap-2 bg-white text-gray-900 "
                            onChange={handleInputChange}
                        />
                        <FaSearch size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                    <ButtonAddObject success={() => 'TODO SALIO BIEN'} />
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
                <ListRegisterObjects state={filter} name={name} />
            </div>
        </div>
    )
}
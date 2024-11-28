import { RiErrorWarningLine } from "react-icons/ri";
import { Navbar } from "../Navbar";
import { FaSearch } from "react-icons/fa";
import { ListNewsRegister } from "./ListNewsRegister";
import { useState } from "react";
import { BiRefresh } from 'react-icons/bi'
import { ButtonAddNew } from "./ButtonAddNew";

export function NewsMobile() {

    const [date, setDate] = useState<string>('')
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setDate(e.target.value) // Elimina espacios innecesarios
    }

    function successMsj() {
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }
    return (
        <div className="">
            {/* NAVBAR */}
            <Navbar />
            <div className="p-4 text-xs">
                {/*  HEADER*/}
                <div className="flex items-center gap-2 my-2">
                    <RiErrorWarningLine className="text-colorOrange" size={20} />
                    <h1 className="text-xl uppercase tracking-widest">NOVEDADES</h1>
                </div>
                {/* SEARCH BY DATE AND LOAD NEW NEWS */}
                <h1 className="mb-2 text-sm">Buscar por fecha</h1>
                <div className="grid grid-cols-3 gap-3 mb-4">
                    <input
                        autoComplete="off"
                        id="dni"
                        name="dni"

                        type="date"
                        placeholder="Buscar DNI"
                        className="px-4 col-span-2 py-3 rounded-md flex items-center gap-2 bg-white text-gray-900 "
                        onChange={handleInputChange}
                    />
                    <ButtonAddNew success={successMsj} />
                </div>
                <div className="flex items-center  justify-center mb-2">
                    <button onClick={() => window.location.reload()} className="ml-auto bg-cyan-800 rounded-full items-center"> <BiRefresh

                        size={30}
                        className=" cursor-pointer text-white hover:animate-spin transition-transform duration-75"
                    /></button>
                </div>
                {/* LIST */}
                <ListNewsRegister date={date} />
            </div>
        </div>
    )
}
import { RiErrorWarningLine } from "react-icons/ri";
import { Navbar } from "../Navbar";
import { ListNewsRegister } from "./ListNewsRegister";
import { useState } from "react";
import { ButtonAddNew } from "./ButtonAddNew";
import { ReloadPageButton } from "../buttons/ReloadPage";
import { useMediaQuery } from "react-responsive";

export function NewsMobile() {
    //resolution
    const isDesktop = useMediaQuery({ minWidth: 1024 })
    //booleano que maneja el fetch en caso de que se agrege un mensaje nuevo par que actualize el array
    const [booleanFetch, setBooleanFetch] = useState<boolean>(false)
    const [date, setDate] = useState<string>('')
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setDate(e.target.value) // Elimina espacios innecesarios
    }

    function successMsj() {
        /* setTimeout(() => {
            window.location.reload()
        }, 2000); */
        setBooleanFetch(!booleanFetch)
    }

    return (
        <div className="">
            {/* NAVBAR */}
            {!isDesktop && (
                <Navbar />
            )}
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
                        className="px-4 py-2 lg:py-1 col-span-2 lg:col-span-1  rounded-md flex items-center gap-2 bg-white text-gray-900 "
                        onChange={handleInputChange}
                    />
                    <ButtonAddNew success={successMsj} />
                </div>
                <ReloadPageButton />
                {/* LIST */}
                <ListNewsRegister boolean={booleanFetch} date={date} />
            </div>
        </div>
    )
}
import { RiErrorWarningLine } from "react-icons/ri";
import { Navbar } from "../Navbar";
import { ListNewsRegister } from "./ListNewsRegister";
import { useState } from "react";
import { ButtonAddNew } from "./ButtonAddNew";
import { ReloadPageButton } from "../buttons/ReloadPage";
import { useMediaQuery } from "react-responsive";
import { StyleInputSearch } from "../../utils/style";
import { FiCalendar } from "react-icons/fi";

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
        setBooleanFetch(!booleanFetch)
    }

    return (
        <div className="">
            {/* NAVBAR */}
            <div className=" text-xs">
                {/*  HEADER*/}
                <div className="flex items-center gap-3 mb-6 p-4">
                    <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                        <RiErrorWarningLine className="text-colorOrange" size={20} />
                    </div>
                    <div>
                        <h1 className="text-xl font-medium text-slate-100 uppercase tracking-wide">Novedades</h1>
                        <p className="text-xs text-slate-400">Gestión de mensajes y comunicados</p>
                    </div>
                </div>

                {/* SEARCH AND ACTIONS SECTION */}
                <div className="bg-slate-800/30 rounded-lg border border-slate-700 p-4 m-4">
                    <div className="flex items-center gap-2 mb-3">
                        <FiCalendar className="w-4 h-4 text-slate-400" />
                        <h2 className="text-sm font-medium text-slate-300">Buscar por fecha</h2>
                    </div>

                    {/* Responsive Layout - Flex en mobile, Grid en desktop */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-4">
                        <div className="flex-1 min-w-0">
                            <input
                                autoComplete="off"
                                id="dni"
                                name="dni"
                                type="date"
                                placeholder="Buscar DNI"
                                className={StyleInputSearch}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex-shrink-0 sm:w-auto w-full">
                            <ButtonAddNew success={successMsj} />
                        </div>
                    </div>

                    {/* Reload Button */}
                    <div className="pt-2 border-t border-slate-700">
                        <ReloadPageButton />
                    </div>
                </div>
                {/* LIST */}
                <ListNewsRegister boolean={booleanFetch} date={date} />
            </div>
        </div>
    )
}
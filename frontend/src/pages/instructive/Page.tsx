import { useMediaQuery } from "react-responsive"
import { Navbar } from "../../components/Navbar"
import { LuFileSpreadsheet } from "react-icons/lu"
import { Iframe } from "./components/Iframe"

export const Instructive = () => {
    const isDesktop = useMediaQuery({ minWidth: 1024 })

    return (
        <div className="w-full">
            <div className=" p-4 text-sm">
                <div className="flex items-center gap-2">
                    <LuFileSpreadsheet className="text-colorOrange" size={20} />
                    <h1 className="text-xl uppercase tracking-widest">Instructivo</h1>
                </div>
            </div>
            <Iframe />
        </div>
    )
}

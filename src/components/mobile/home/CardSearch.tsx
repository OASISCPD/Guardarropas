import { BsUpcScan } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
export function CardSearch() {
    return (
        <div className="p-4 ">
            <div className="bg-colorGray rounded-md p-4 ">
                <h1 className="text-xl font-semibold">Asignar cliente</h1>
                <div className="flex justify-between gap-2 my-3 text-xs">
                    {/*  <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
                    <FaQrcode />
                    Escanear DNI
                    </button> */}
                    <div className="flex relative">
                        <input
                            type="text"
                            placeholder="Escanear DNI"
                            className="w-full px-4 py-2 placeholder:text-white  rounded-md flex items-center gap-2 bg-colorBlue "
                        />
                        <BsUpcScan size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white" />
                    </div>
                    <div className="flex relative">
                        <input
                            type="text"
                            placeholder="Buscar DNI manual"
                            className="w-full px-4 py-2 rounded-md flex items-center gap-2 bg-white text-gray-900 "
                        />
                        <FaSearch size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                </div>
                <div className="flex justify-between gap-4 text-sm">
                    <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
                        <span>Libre</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
                        <span>Ocupado</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
                        <span>Olvidado</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
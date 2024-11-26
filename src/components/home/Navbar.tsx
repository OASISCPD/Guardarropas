import { MdQrCodeScanner } from "react-icons/md";
import { CgSearchFound } from "react-icons/cg";

export function Navbar() {
    return (
        <div className="bg-colorGray text-xs xl:text-sm py-[2dvh]  w-full rounded-md">
            <div className="flex flex-wrap justify-between items-center mx-[1dvh]">
                <div className="">
                    <h1 className="xl:text-xl">Asignar Cliente</h1>
                </div>
                {/* ACA AGREGAMOS LOS INPUTS PARA ESCANEAR O TIPEAR */}
                <div className="flex justify-center gap-[1dvh]">
                    <div className="flex flex-wrap relative items-center justify-center">
                        <MdQrCodeScanner
                            className=" absolute right-[2dvh] top-0  text-white"
                            size={24}
                        />
                        <h1>Escanear DNI</h1>
                        <div>
                            <input
                                /*  value={inputValue}
                                 onChange={handleInputChangeScan}
                                 ref={inputRef} */ // Referencia al input
                                placeholder="Escanear DNI"
                                className="mx-4 hover:bg-blue-600 bg-colorBlue px-4 py-0.5 rounded-md text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap relative items-center justify-center">
                        <CgSearchFound
                            className=" absolute right-[2dvh] top-0  text-black"
                            size={24}
                        />
                        <h1>Ingreso Manual</h1>
                        <div>
                            <input
                                className="text-black mx-4 px-4 rounded-md py-0.5 focus:outline-none focus:ring-2 hover:bg-zinc-100 focus:ring-blue-500 focus:border-transparent"
                                type="text"
                                id="dni"
                                /*           value={dni}
                                          onChange={handleInputChange}
                                          onClick={alertScan} */
                                autoComplete="off"
                                placeholder="Buscar DNI manual"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex">
                        <div className="px-4 bg-colorGreen rounded-md mx-2"></div>
                        <a>Libre</a>
                    </div>
                    <div className="flex">
                        <div className="px-4 bg-colorRed rounded-md mx-2"></div>
                        <a>Ocupado</a>
                    </div>
                    <div className="flex">
                        <div className="px-4 bg-colorYellow rounded-md mx-2"></div>
                        <a>Olvidado</a>
                    </div>
                </div>
            </div>
        </div >
    )
}
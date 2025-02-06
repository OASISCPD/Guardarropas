import { toast } from "react-toastify";
import { ClientSelectDTO } from "../../types/client";

interface propCard {
    name: string
    dni: number | string
    phone: string | number
    setUserSelect: React.Dispatch<React.SetStateAction<ClientSelectDTO | undefined>>;

}
export function CardClientSelect({ dni, name, phone, setUserSelect }: propCard) {

    function deleteUser() {
        setUserSelect({ client: '', dni: '', phone: '', id_cliente: 0, id_usuario: 0 })
        toast.success("Se elimino el cliente correctamente")
    }

    return (
        <div className="p-4">
            <div className=" bg-colorGray lg:bg-colorGray/0 rounded-md  p-4 lg:p-0 text-xs ">
                {/* Mobile view - Stack vertically */}
                <div className="block lg:hidden">
                    <div className="p-4 space-y-4">
                        <div className="space-y-1">
                            <div className="text-gray-400 ">NOMBRE</div>
                            <div className="text-white">{name}</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-gray-400 ">DNI</div>
                            <div className="text-white">{dni}</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-gray-400 ">TELÉFONO</div>
                            <div className="text-white">{phone}</div>
                        </div>
                        <button onClick={deleteUser} className="w-full mt-4 px-4 py-2 bg-colorRed hover:bg-red-700 hover:scale-105 duration-100 text-white rounded  transition-colors">
                            Eliminar
                        </button>
                    </div>
                </div>
                <div className="hidden lg:block">
                    <div className="max-w-lg  mr-auto">
                        <div className="bg-colorGray rounded-md shadow-2xl p-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-xs mb-1">NOMBRE</label>
                                    <p className="text-white font-medium">{name}</p>
                                </div>

                                <div>
                                    <label className="block text-gray-400 text-xs mb-1">DNI</label>
                                    <p className="text-white font-medium">{dni}</p>
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-gray-400 text-xs mb-1">TELÉFONO</label>
                                    <p className="text-white font-medium">{phone || 'No se ha asociado un número de teléfono'}</p>
                                </div>
                                <div className="flex justify-center items-center mx-auto col-span-2">
                                    <button
                                        onClick={deleteUser}
                                        className="w-full  bg-colorRed hover:scale-105 duration-100 text-white font-medium py-2.5 px-8 rounded-md transition-colors"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}
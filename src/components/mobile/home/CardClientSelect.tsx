import { ClientSelectDTO } from "../../../types/client";

interface propCard {
    name: string
    dni: number | string
    phone: string | number
    setUserSelect: React.Dispatch<React.SetStateAction<ClientSelectDTO | undefined>>;

}
export function CardClientSelect({ dni, name, phone, setUserSelect }: propCard) {

    function deleteUser() {
        setUserSelect({ client: '', dni: '', phone: '' })
    }
    return (
        <div className="p-4">
            <div className=" bg-colorGray rounded-md  p-4 text-xs ">
                {/* Mobile view - Stack vertically */}
                <div className="block sm:hidden">
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
                        <button onClick={deleteUser} className="w-full mt-4 px-4 py-2 bg-colorRed hover:bg-red-700 text-white rounded  transition-colors">
                            Eliminar
                        </button>
                    </div>
                </div>
            </div >
        </div >
    )
}
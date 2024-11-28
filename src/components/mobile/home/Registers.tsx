import { LuLock, LuSearch } from "react-icons/lu"
import { ScrollContainer } from "../../logic/ScrollContainer"
import { BsUpcScan } from "react-icons/bs"
import { FaSearch } from "react-icons/fa"
import { GetRegisterDTO } from "../../../types/registers"



export default function Registers() {
    const register: GetRegisterDTO[] = [
        {
            id_registro: 38106,
            datetime_ingreso: "26/11/2024 08:52:01",
            datetime_egreso: null,
            n_documento: "F4090821",
            apellido_nombre: "FISTER, BLANCA ZULEMA",
            lugares_ocupados: "paraguas 30",
        },
        {
            id_registro: 38107,
            datetime_ingreso: "26/11/2024 09:10:45",
            datetime_egreso: null,
            n_documento: "G5012391",
            apellido_nombre: "PEREZ, JUAN CARLOS",
            lugares_ocupados: "sala 2",
        },
        {
            id_registro: 38108,
            datetime_ingreso: "26/11/2024 09:45:30",
            datetime_egreso: null,
            n_documento: "H3049182",
            apellido_nombre: "GOMEZ, ANA MARIA",
            lugares_ocupados: "paraguas 15",
        },
        {
            id_registro: 38109,
            datetime_ingreso: "26/11/2024 10:12:20",
            datetime_egreso: null,
            n_documento: "J6038491",
            apellido_nombre: "LOPEZ, CARLOS",
            lugares_ocupados: "vestuario A",
        },
        {
            id_registro: 38110,
            datetime_ingreso: "26/11/2024 10:35:45",
            datetime_egreso: null,
            n_documento: "K2018394",
            apellido_nombre: "MARTINEZ, ELENA",
            lugares_ocupados: "casillero 3",
        },
        {
            id_registro: 38111,
            datetime_ingreso: "26/11/2024 11:00:00",
            datetime_egreso: null,
            n_documento: "L9052817",
            apellido_nombre: "RODRIGUEZ, MIGUEL",
            lugares_ocupados: "paraguas 5",
        },
        {
            id_registro: 38112,
            datetime_ingreso: "26/11/2024 11:25:18",
            datetime_egreso: null,
            n_documento: "M8392054",
            apellido_nombre: "FERNANDEZ, LUIS",
            lugares_ocupados: "sala 1",
        },
        {
            id_registro: 38113,
            datetime_ingreso: "26/11/2024 11:50:00",
            datetime_egreso: null,
            n_documento: "N5038291",
            apellido_nombre: "TORRES, JULIA",
            lugares_ocupados: "sala 3",
        },
        {
            id_registro: 38114,
            datetime_ingreso: "26/11/2024 12:10:33",
            datetime_egreso: null,
            n_documento: "P4075821",
            apellido_nombre: "SANCHEZ, PEDRO",
            lugares_ocupados: "casillero 1",
        },
        {
            id_registro: 38115,
            datetime_ingreso: "26/11/2024 12:30:15",
            datetime_egreso: null,
            n_documento: "Q5019283",
            apellido_nombre: "RAMIREZ, MARIA",
            lugares_ocupados: "vestuario B",
        },
    ]

    return (
        <div className="mt-4  text-xs sm:text-sm">
            {/* Header */}
            <header className=" p-4">
                <div className="flex items-center gap-2 text-white mb-4">
                    <LuLock size={16} className=" text-colorOrange" />
                    <h1 className="text-sm tracking-widest">REGISTROS</h1>
                </div>
                <div className="flex justify-between gap-2 my-3 text-sm">

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
                            placeholder="Buscar DNI"
                            className="w-full px-4 py-2 rounded-md flex items-center gap-2 bg-white text-gray-900 "
                        />
                        <FaSearch size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                </div>
            </header>
            {/* Records List */}
            <div className="p-4">
                <ScrollContainer maxHeight="400px">
                    <table className="min-w-full  text-center">
                        <thead>
                            <tr className="text-xs uppercase">
                                <td className="py-4 px-4 whitespace-nowrap">ID</td>
                                <td className="py-4 px-4 whitespace-nowrap">
                                    Fecha y Hora Ingreso
                                </td>
                                <td className="py-4 px-4 whitespace-nowrap">DNI</td>
                                <td className="py-4 px-4 whitespace-nowrap">
                                    Apellido y Nombre
                                </td>
                                <td className="py-4 px-4 whitespace-nowrap">Lugar</td>
                                <td className="py-4 px-4 whitespace-nowrap"></td>
                            </tr>
                        </thead>
                        {register.map((register) => (
                            <tbody
                                key={register.id_registro}
                                className="bg-colorGray rounded-md text-xs"
                            >
                                <tr>
                                    <td className="py-2 px-4">{register.id_registro}</td>
                                    <td className="py-2 px-4">
                                        {register.datetime_ingreso}
                                    </td>
                                    <td className="py-2 px-4">{register.n_documento}</td>
                                    <td className="py-2 px-4">
                                        {register.apellido_nombre}
                                    </td>
                                    <td className="py-2 px-4 uppercase">
                                        {register.lugares_ocupados}
                                    </td>
                                    <td className="py-2 px-4 flex">
                                        <button
                                            /*  onClick={() => openModal(registro.id_registro)} */
                                            className="bg-colorBlue hover:bg-blue-800 hover:scale-105 duration-300 text-white px-6 py-1 rounded-md"
                                        >
                                            EDITAR
                                        </button>
                                        <button

                                            className="bg-colorRed hover:bg-red-600 hover:scale-105 duration-300 text-white px-6 py-1 rounded-md mx-2"
                                        >
                                            RETIRAR
                                        </button>
                                        <button

                                            className="bg-colorYellow hover:bg-yellow-600 hover:scale-105 duration-300 text-white px-3 py-1 rounded-md"
                                        >
                                            OLVIDADO
                                        </button>

                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </ScrollContainer>
            </div>
        </div>
    )
}

/* 

 <h1 className="min-w-[100px]">ID</h1>
                        <h1 className="min-w-[200px]">FECHA Y HORA INGRESO</h1>
                        <h1 className="min-w-[150px]">DNI</h1>
                        <h1 className="min-w-[250px]">APELLIDO Y NOMBRE</h1>
                        <h1 className="min-w-[200px]">LUGAR</h1>
                        <h1 className="min-w-[150px]">ACCIONES</h1>
*/
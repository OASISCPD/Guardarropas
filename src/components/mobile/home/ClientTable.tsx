import { ScrollContainer } from "../../logic/ScrollContainer";

// Interfaz para definir los datos del cliente
interface Client {
    apellido: string;
    nombre: string;
    n_documento: string;
    celular: string;
}

const clients: Client[] = [
    {
        apellido: "PEREZ",
        nombre: "JUAN CARLOS",
        n_documento: "12345678",
        celular: "+54 9 11 1234-5678",
    },
    {
        apellido: "GARCÍA",
        nombre: "MARÍA JOSE",
        n_documento: "87654321",
        celular: "+54 9 11 8765-4321",
    },
    {
        apellido: "LOPEZ",
        nombre: "CARLOS EDUARDO",
        n_documento: "11223344",
        celular: "+54 9 11 1122-3344",
    },
    {
        apellido: "MARTÍNEZ",
        nombre: "LUIS FERNANDO",
        n_documento: "55667788",
        celular: "+54 9 11 5566-7788",
    },
    {
        apellido: "DÍAZ",
        nombre: "ANA MARÍA",
        n_documento: "99887766",
        celular: "+54 9 11 9988-7766",
    },
    {
        apellido: "GOMEZ",
        nombre: "FABIOLA",
        n_documento: "55443322",
        celular: "+54 9 11 5544-3322",
    },
    {
        apellido: "RAMÍREZ",
        nombre: "JORGE",
        n_documento: "22334455",
        celular: "+54 9 11 2233-4455",
    },
    {
        apellido: "FERNÁNDEZ",
        nombre: "MARTÍN",
        n_documento: "66778899",
        celular: "+54 9 11 6677-8899",
    },
    {
        apellido: "PÉREZ",
        nombre: "JULIANA",
        n_documento: "88990011",
        celular: "+54 9 11 8899-0011",
    },
    {
        apellido: "VÁSQUEZ",
        nombre: "SANTIAGO",
        n_documento: "22337799",
        celular: "+54 9 11 2233-7799",
    },
];

interface propTable {
    clickClient: (dni: number | string, lastName: string, name: string, phone: string | number) => void
}
export function ClientTable({ clickClient }: propTable) {
    return (
        <ul className={`z-20 text-xs w-full bg-white border text-black border-gray-300 rounded-md shadow-2xl`}>
            <table className="w-full border-collapse border border-colorBlue max-w-xl mx-auto">
                <ScrollContainer maxHeight="400px">
                    <thead>
                        <tr className="bg-slate-800 text-center text-white">
                            <td className="py-2 px-2 border">Nombre</td>
                            <td className="py-2 px-2 border">DNI</td>
                            <td className="py-2 px-2 border">Telefono</td>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client, index) => (
                            <tr onClick={() => clickClient(client.n_documento, client.apellido, client.nombre, client.celular)}
                                key={index}
                                className="bg-zinc-100 border-b cursor-pointer border-blue-500 hover:bg-zinc-200"
                            >
                                <td className="py-2 border px-4">
                                    {client.apellido}, {client.nombre}
                                </td>
                                <td className="py-2 border px-4">{client.n_documento}</td>
                                <td className="py-2 border px-4">{client.celular}</td>
                            </tr>
                        ))}
                    </tbody>
                </ScrollContainer>
            </table>
        </ul>
    );
}

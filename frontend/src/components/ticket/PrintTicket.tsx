import { useEffect, useState } from "react";
import { domain } from "../../config/domain";
import { BaseUrl } from "../../logic/api";
const image = `../images/${domain.toLowerCase()}/logoImprimir.png`;

interface getLastRegisterDTO {
    apellido_nombre: string; // Nombre completo del usuario
    datetime_egreso: string | null; // Fecha y hora de egreso, puede ser null
    datetime_ingreso: string; // Fecha y hora de ingreso
    id_registro: number; // Identificador único del registro
    lugares_ocupados: string; // Lugar ocupado (e.g., box)
    numeroDocumento: string; // Número de documento
}

interface getGenerateTicketDTO {
    box: string
    fecha_ingreso: string
    nombre_apellido: string
    numDocumento: String
    paraguas: string
    percha: string
}
export function PrintTicket() {
    const [response, setResponse] = useState<getGenerateTicketDTO>();
    const [condition, setCondition] = useState(false);
    //useState dataRegister
    const [data, setData] = useState<getLastRegisterDTO>();
    const print = () => {
        setTimeout(() => {
            window.print();
        }, 1000);
        // Espera 2 segundos antes de imprimir el segundo ticket
        setTimeout(() => {
            window.print();
            setCondition(true);
        }, 2000);
        setTimeout(() => {
            closeTab();
        }, 6000);
    };
    const closeTab = () => {
        window.close();
    };
    //obteniendo el ultimo registro
    const fetchDataRegister = async () => {
        try {
            const res = await fetch(
                `${BaseUrl}/traer_ultimo_registro`,
                {
                    credentials: 'include' as RequestCredentials,
                }
            );
            const data = await res.json()
            console.log(data)
            await setData(data);
        } catch (error) { }
    };
    const fetchData = async (id_registro: number) => {
        try {
            const res: any = await fetch(
                `${BaseUrl}/generar_ticket?id_registro=${id_registro}`,
                {
                    credentials: 'include' as RequestCredentials,
                }
            );
            console.log(res)
            const data = await res.json()
            await setResponse(data); // Convertir a cadena aquí
            setCondition(true);
            print();
        } catch (error) {
            console.error("Error:", error);
        }
    };
    useEffect(() => {
        fetchDataRegister();
    }, []);

    useEffect(() => {
        if (!data) {
            return
        }
        fetchData(data.id_registro);
    }, [data]);

    // Formatear fecha
    const formatearFecha = (fecha: string) => {
        const [dia, mes, anioHora] = fecha.split("/");
        const [anio, hora] = anioHora.split(" ");
        const fechaISO = `${anio}-${mes}-${dia}T${hora}`;
        const date = new Date(fechaISO);

        return date.toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    return (
        <div className={`bg-white text-black p-4 font-mono text-sm mx-auto flex flex-col items-center justify-center leading-tight ${!condition ? 'hidden' : ''}`} style={{ width: '58mm', minHeight: '100mm' }}>
            {/* Header */}
            <div className="text-center mb-2 border-b border-black pb-2">
                <img
                    className="logo mx-auto max-w-90 h-auto -mt-4 mb-1"
                    src={image}
                    alt="Logo"
                    style={{ maxWidth: "80%", width: "125px" }}
                />
                <div className="font-bold text-sm">TICKET DE INGRESO</div>
                <div className="text-center text-xs font-bold">Bienvenido/a</div>
            </div>

            {/* Cliente */}
            <div className="mb-4 w-full">
                <div className="font-bold text-xs mb-2 text-center">DATOS DEL CLIENTE</div>
                <div className="text-center text-base font-bold border-2 border-black p-2 mb-2">
                    {response?.nombre_apellido || 'Cargando...'}
                </div>
                <div className="text-center">
                    <span className="font-bold text-xs">DNI:</span>
                    <div className="border-b border-dotted border-black pb-1 text-center font-bold">
                        {response?.numDocumento || 'Cargando...'}
                    </div>
                </div>
            </div>

            {/* Información del servicio */}
            <div className="mb-4 w-full">
                <div className="font-bold text-xs mb-2 text-center">SERVICIOS ASIGNADOS</div>
                <div className="grid grid-cols-1 gap-1 text-xs">
                    <div>
                        <span className="font-bold">Box:</span>
                        <div className="border-b border-dotted border-black pb-1">{response?.box || 'Cargando...'}</div>
                    </div>
                    <div>
                        <span className="font-bold">Percha:</span>
                        <div className="border-b border-dotted border-black pb-1">{response?.percha || 'Cargando...'}</div>
                    </div>
                    <div>
                        <span className="font-bold">Paraguas:</span>
                        <div className="border-b border-dotted border-black pb-1">{response?.paraguas || 'Cargando...'}</div>
                    </div>
                </div>
            </div>

            {/* Fecha y hora */}
            <div className="mb-2 w-full">
                <div className="text-center text-xs">
                    <div className="font-bold mb-1">FECHA Y HORA DE INGRESO</div>
                    <div className="border-b border-dotted border-black pb-1">
                        {response?.fecha_ingreso ? formatearFecha(response.fecha_ingreso) : 'Cargando...'}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-4 text-xs border-t border-black pt-2">
                <div>Sistema Guardarropas</div>
                <div>{new Date().toLocaleDateString('es-AR')}</div>
            </div>
        </div>
    );
}
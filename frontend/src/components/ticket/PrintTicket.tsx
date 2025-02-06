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
    return (
        <>
            {condition ? (
                <div className="ticket text-black">
                    <img
                        className="logo mx-auto max-w-90 h-auto mt-2 mb-1"
                        src={image}
                        alt="Logo"
                        style={{ maxWidth: "80%", width: "125px" }}
                    />
                    <div className="text-center text-base  mb-10">
                        Bienvenido/a{" "}
                        <span id="nombre_apellido">{response?.nombre_apellido}</span>
                    </div>
                    <div className="contenido  text-center text-xs">
                        DNI: <span id="numDocumento">{response?.numDocumento}</span>
                        <br />
                        <span id="box">{response?.box}</span>
                        <br />
                        <span id="percha">{response?.percha}</span>
                        <br />
                        <span id="paraguas">{response?.paraguas}</span>
                        <br />
                        <br />
                        <div className="text-right">
                            <span id="fecha_ingreso" className="text-xs">
                                {response?.fecha_ingreso}
                            </span>
                        </div>
                        <br />
                        <hr />
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
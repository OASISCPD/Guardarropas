import { useEffect, useState } from "react";
import { domain } from "../../config/domain";
const image = `../images/${domain.toLowerCase()}/logoImprimir.png`;

interface LostObjectDTO {
    id_objeto_perdido: number;
    tipo_objeto: string;
    detalle: string;
    marca: string;
    color: string;
    fecha_hora_encuentro: string;
    lugar_de_encuentro: string;
    persona_que_encontro: string;
    sector: string;
    estado: string;
}

export function PrintTicketLost() {
    const [data, setData] = useState<LostObjectDTO | null>(null);

    useEffect(() => {
        const raw = sessionStorage.getItem("lostObjectToPrint");
        if (raw) {
            setData(JSON.parse(raw));
            setTimeout(() => {
                window.print();
                setTimeout(() => window.close(), 3000);
            }, 1000);
        } else {
            window.close(); // Si no hay datos, cerrá la pestaña
        }
    }, []);

    if (!data) return null;

    // Formatear fecha
    const formatearFecha = (fecha: string) => {
        const date = new Date(fecha);
        return date.toLocaleDateString('es-AR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <div className="bg-white text-black p-4 font-mono text-sm mx-auto flex flex-col items-center justify-center leading-tight" style={{ width: '58mm', minHeight: '100mm' }}>
            {/* Header */}
            <div className="text-center mb-2 border-b border-black pb-2">
                <img
                    className="logo mx-auto max-w-90 h-auto -mt-4 mb-1"
                    src={image}
                    alt="Logo"
                    style={{ maxWidth: "80%", width: "125px" }}
                />
                <div className="font-bold text-sm">OBJETO PERDIDO</div>
                <div className="text-center text-xs font-bold">N° {data.id_objeto_perdido}</div>
            </div>

            {/* Info Principal en 3 columnas */}
            <div className="grid grid-cols-2 w-full gap-1 mb-4 text-xs">
                <div className="text-center col-span-2">
                    <div className="font-bold mb-1">FECHA</div>
                    <div className="border-b border-dotted border-black pb-1">{data.fecha_hora_encuentro}</div>
                </div>
                <div className="text-center">
                    <div className="font-bold mb-1">ESTADO</div>
                    <div className="border-b border-dotted border-black pb-1">{data.estado}</div>
                </div>
                <div className="text-center">
                    <div className="font-bold mb-1">SECTOR</div>
                    <div className="border-b border-dotted border-black pb-1">{data.sector}</div>
                </div>
            </div>

            {/* Objeto Principal */}
            <div className="mb-4  pb-2 w-full">
                <div className="font-bold text-xs mb-2 text-center">OBJETO ENCONTRADO</div>
                <div className="text-center text-base font-bold border-2 border-da border-black p-2 mb-2">
                    {data.tipo_objeto}
                </div>
                <div className="grid grid-cols-1 gap-1 pt-1 text-xs">
                    <div>
                        <span className="font-bold">Detalle:</span>
                        <div className="border-b border-dotted border-black pb-1">{data.detalle}</div>
                    </div>
                    {data.marca && (
                        <div>
                            <span className="font-bold">Marca:</span>
                            <div className="border-b border-dotted border-black pb-1">{data.marca}</div>
                        </div>
                    )}
                </div>
                <div className="mt-1">
                    <span className="font-bold text-xs">Color:</span>
                    <div className="border-b border-dotted border-black pb-1 text-center font-bold">{data.color}</div>
                </div>
            </div>

            {/* Ubicación y Responsable */}
            <div className="mb-2 w-full">
                <div className="grid grid-cols-1 gap-2 text-xs">
                    <div>
                        <div className="font-bold mb-1">LUGAR DE ENCUENTRO</div>
                        <div className="border-b border-dotted border-black pb-1">{data.lugar_de_encuentro}</div>
                    </div>
                    <div>
                        <div className="font-bold mb-1">ENCONTRADO POR</div>
                        <div className="border-b border-dotted border-black pb-1">{data.persona_que_encontro}</div>
                    </div>
                </div>
            </div>

            {/* Espacio para firma */}
            {/*     <div className=" pt-2 w-full">
                <div className="text-center text-xs">
                    <div className="border-b border-dotted border-black pb-8 mb-1 h-4"></div>
                    <div className="font-bold mb-2">FIRMA DEL RESPONSABLE</div>
                </div>
            </div> */}

            {/* Footer */}
            <div className="text-center mt-4 text-xs border-t border-black pt-2">
                <div>Sistema Guardarropas</div>
                <div>{new Date().toLocaleDateString('es-AR')}</div>
            </div>
        </div>
    );
}

import { useState } from "react";
import { RiLoader4Line } from "react-icons/ri";

export const Iframe = () => {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoad = () => {
        setIsLoading(false); // Cambiar el estado a false cuando el iframe haya terminado de cargar
    };

    return (
        <div className=" w-full   h-screen relative"> {/* Relación de aspecto 16:9 */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                    <div>
                        <RiLoader4Line className='animate-spin mx-auto' size={42} />
                        <p className="text-lg font-semibold text-gray-600 animate-pulse">Cargando instructivo...</p>
                    </div>
                </div>
            )}
            <iframe
                src="https://service-instructions.vercel.app/home?nameApp=guardarropas"
                title="Campañas"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                sandbox="allow-same-origin allow-scripts allow-forms"
                onLoad={handleLoad} // Detectar cuando el iframe termina de cargar
            />
        </div>
    )
}
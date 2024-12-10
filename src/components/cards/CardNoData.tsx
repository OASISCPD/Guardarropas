interface CardNoDataProps {
    type: string
}
export function CardNoData({ type }: CardNoDataProps) {
    //usamos un objeto de mapeo para simplificar la logica de else if y demas para variables
    const typeTextMap: Record<string, string> = {
        news: 'novedades',
        lost: 'objetos perdidos',
        forgotten: 'objetos olvidados',
        history: 'registros históricos',
        clients: 'clientes'
    }

    //obtenemos el texto basado en el tipo; si no esta definido usamos un valor por defecto
    const getTextByType = (type: string): string => typeTextMap[type] || '';

    return (
        <div className="p-4 my-2 bg-colorGray rounded-md shadow-sm flex flex-col items-center justify-center">
            <h1 className="text-lg text-colorRed">Sin datos disponibles</h1>
            <p className="text-white mt-2">No se encontraron {getTextByType(type)}</p>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-12 h-12 text-white mt-4"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 3h.01M21 12c0 4.97-4.03 9-9 9S3 16.97 3 12 7.03 3 12 3s9 4.03 9 9z" />
            </svg>
        </div>
    )
}
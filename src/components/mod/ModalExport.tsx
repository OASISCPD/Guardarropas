import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { BaseUrl } from "../../logic/api";

interface propModal {
    onClose: () => void
}
export function ModalExport({ onClose }: propModal) {
    const [error, setError] = useState<string | null>(null);
    const [desde, setDesde] = useState<string>('');
    const [hasta, setHasta] = useState<string>('');

    function submit() {
        if (!desde || !hasta /* || id_campana === null */) {
            setError('Por favor, seleccione fechas y una campaña.');
            return;
        }
        // Validar que la fecha desde sea menor o igual que la fecha hasta
        if (new Date(desde) > new Date(hasta)) {
            setError('La fecha "Desde" no puede ser mayor que la fecha "Hasta".');
            return;
        }
        console.log('enviando')
        const url = `${BaseUrl}/exportar_registros?fecha_desde=${desde}&fecha_hasta=${hasta}&n_documento=`
        window.open(url, '_blank');
        setError(null); // Reset error after successful submission
    }
    return (
        <section className="fixed top-0 left-0 w-full h-full flex items-center justify-center  z-500">
            <div className="rounded-xl shadow-xl max-w-md w-full mx-4 md:mx-auto ">
                <div className=" bg-colorGray text-sm  rounded-md shadow min-h-60 ">
                    <div className="flex items-center justify-between p-4">
                        <button className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-md  h-8 w-8 ms-auto inline-flex justify-center items-center " onClick={onClose}>
                            <IoMdClose size={40} />
                        </button>
                    </div>
                    <div className="p-4">
                        <div className="text-white">
                            <div className="mb-5">
                                <label className="block mb-2    ">Fecha Desde</label>
                                <input type="date" name="desde" id="desde_pacientes" defaultValue={desde} onChange={(e) => setDesde(e.target.value)} className="bg-zinc-700 bg-opacity-80  border border-colorWhiteShadow   rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@flowbite.com" required />
                            </div>
                            <div className="mb-5">
                                <label className="block mb-2    ">Fecha Hasta</label>
                                <input type="date" name="hasta" id="hasta_pacientes" defaultValue={hasta} onChange={(e) => setHasta(e.target.value)} placeholder="Desde DD-MM-AAAA" className="bg-zinc-700 bg-opacity-80  border border-colorWhiteShadow   rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
                            </div>
                            {error && <div className='text-red-500 mb-3 '>{error}</div>}
                            <div className="modal-footer mt-3 flex justify-center">
                                <button type="button" onClick={submit} className="bg-colorRed rounded-md mx-2 px-8 py-1.5   shadow-xl  flex items-center text-white" id="boton_pacientes">Exportar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
import { useForm, useFieldArray } from "react-hook-form";
import { IoMdAddCircle, IoMdClose } from "react-icons/io";
import { ScrollContainer } from "../logic/ScrollContainer";
import { toast } from "react-toastify";
import { TiDeleteOutline } from "react-icons/ti";
import { useState } from "react";

export interface FormDataDTO {
    prendas: { prenda: string }[]; // Array para manejar múltiples prendas
    id_lugar: number;
    id_front?: number;
}
export interface transformDataStorage {
    id_lugar: number
    id_front: number | undefined
    prenda: string
}

export interface propForm {
    id: number;
    index?: number;
    onClose: () => void;
    onSuccess: (data: transformDataStorage[]) => void;
}

export function ModalBoxes({ onClose, onSuccess, id, index }: propForm) {
    const { register, setValue, getValues, handleSubmit, control } = useForm<FormDataDTO>({
        defaultValues: { prendas: [{ prenda: "" }] }, // Array inicial con un elemento vacío
    });

    // React Hook Form para manejar arrays dinámicos
    const { fields, append, remove } = useFieldArray({
        control,
        name: "prendas", // Nombre del campo en el formulario
    });
    // Estado para rastrear los índices seleccionados como "OTROS"
    const [isOtherSelected, setIsOtherSelected] = useState<boolean[]>([]);

    // Función para manejar el cambio en el select
    const handleSelectChange = (value: string, index: number) => {
        if (value === "OTROS") {
            setIsOtherSelected((prev) => {
                const updated = [...prev];
                updated[index] = true;
                return updated;
            });
        } else {
            setIsOtherSelected((prev) => {
                const updated = [...prev];
                updated[index] = false;
                return updated;
            });
        }
    };

    // Función que maneja el envío del formulario
    async function onSubmit(data: FormDataDTO) {
        if (data.prendas.some((item) => item.prenda === "")) {
            console.log("ALGUNA PRENDA ESTÁ VACÍA");
            toast.warning("Seleccionar una prenda/objeto para agregar al box");
            return;
        }
        // Generar el formato deseado
        const transformedData = data.prendas.map((item) => ({
            id_lugar: id,
            id_front: index,
            prenda: item.prenda,
        }));

        console.log(transformedData);

        // Llamar onSuccess después de procesar la data
        onSuccess(transformedData);
    }


    return (
        <section className="fixed top-0 left-0 w-full h-full flex items-center justify-center  z-500">
            <div className="rounded-xl shadow-xl max-w-md w-full mx-4 md:mx-auto ">
                <div className=" bg-colorGray  rounded-md shadow min-h-60 ">
                    <div className="flex items-center justify-between p-4">
                        <h3 className="text-xl strokeWidth text-gray-900"></h3>
                        <button
                            className="text-white bg-transparent  hover:text-gray-900 rounded-md text-sm h-8 w-8 ms-auto inline-flex justify-center items-center "
                            onClick={onClose}
                        >
                            <IoMdClose size={40} />
                        </button>
                    </div>
                    <div className="p-4">
                        <h1 className="text-center">BOX N° {id}</h1>
                        <form className="text-black text-xs uppercase" onSubmit={handleSubmit(onSubmit)}>
                            <ScrollContainer maxHeight="400px">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="mb-4">
                                        <label className="text-white" htmlFor={`prendas.${index}.prenda`}>
                                            Ingresar Objeto {index + 1}
                                        </label>
                                        <select
                                            {...register(`prendas.${index}.prenda` as const)}
                                            id={`prendas.${index}.prenda`}
                                            className="my-1 p-2 w-full border rounded-md text-black"
                                            onChange={(e) => handleSelectChange(e.target.value, index)}
                                        >
                                            <option value="" disabled>
                                                ELEGIR UNA OPCIÓN
                                            </option>
                                            <option value="MOCHILA">MOCHILA</option>
                                            <option value="CASCO">CASCO</option>
                                            <option value="CAMPERA">CAMPERA</option>
                                            <option value="BOTELLA">BOTELLA</option>
                                            <option value="BOLSA">BOLSA</option>
                                            <option value="BOLSO">BOLSO</option>
                                            <option value="PARAGUAS CHICO">PARAGUAS CHICO</option>
                                            <option value="ALIMENTOS">ALIMENTOS</option>
                                            <option value="PARKA O CAMPERÓN">PARKA O CAMPERÓN</option>
                                            <option value="SACO">SACO</option>
                                            <option value="TAPADO">TAPADO</option>
                                            <option value="REMERA">REMERA</option>
                                            <option value="CAMISA">CAMISA</option>
                                            <option value="BUFANDA">BUFANDA</option>
                                            <option value="GORRO">GORRO</option>
                                            <option value="SOMBRERO">SOMBRERO</option>
                                            <option value="CHALECO">CHALECO</option>
                                            <option value="OTROS">OTROS</option>
                                        </select>
                                        {/* ACA DEBERIA MOSTRARSE UN INPUT PARA EL VALOR DE OTROS  */}
                                        {isOtherSelected[index] && (
                                            <input
                                            autoComplete="off"
                                                {...register(`prendas.${index}.prenda` as const)}
                                                placeholder="Ingrese el valor de la prenda/objeto"
                                                className="my-1 p-2 w-full border rounded-md text-black"
                                            />
                                        )}
                                        {fields.length > 1 && (
                                            <TiDeleteOutline
                                                onClick={() => remove(index)}
                                                className="text-red-500 cursor-pointer hover:text-red-700"
                                                size={24}
                                            />
                                        )}
                                    </div>
                                ))}
                                <IoMdAddCircle
                                    onClick={() => append({ prenda: "" })}
                                    className="text-zinc-200 cursor-pointer hover:text-green-500"
                                    size={32}
                                />
                            </ScrollContainer>
                            <div className="  mt-4 flex justify-center">
                                <button
                                    type="submit"
                                    className="bg-colorBlue rounded-md mx-2 px-8 py-3 w-full text-center  shadow-xl  flex justify-center items-center text-white"
                                >
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

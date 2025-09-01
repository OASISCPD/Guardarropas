import { IoMdClose } from "react-icons/io";
import { ScrollContainer } from "../logic/ScrollContainer";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { LoaderRegisterHoverMobile } from "../loaders/LoaderRegister";
import { toast } from "react-toastify";
import { ObjectSendDTO } from "../../types/object";
import { brandBriefcase, brandCigarette, brandGap, brandPhone, brandTopClothing, excludedTypes, optionsTypeLocation, optionsTypeObject } from "../../data/options";
import { BaseUrl } from "../../logic/api";

interface propModal {
    onClose: () => void
    success: () => void
}

export function ModalAddObjectLost({ onClose, success }: propModal) {
    const { register, setValue, handleSubmit, watch, getValues, unregister } = useForm<ObjectSendDTO>()
    //constante que valida la asincronia en los datos
    const [currentType, setCurrentType] = useState<string>(getValues('tipo_objeto') || '')
    //constantes que almacenan la logica para los diferentes formas de tipeo para la carga de un objeto perdido
    //constante que manje ael tipeo el objeto
    const [isOtherTypeObject, setIsOtherTypeObject] = useState<boolean>(false)
    //constate que maneja el tipeo de la marca
    const [isOtherBrand, setIsOtherBrand] = useState<boolean>(false)

    ///loading al mandar el mensaje al fetch
    const [loading, setLoading] = useState<boolean>(false)
    //constante que maneja el estado de si mostrar o no los colores
    const [isTableColors, setIsTableColors] = useState<boolean>(false)
    //array de colores
    const colors: string[] = [
        '#ff0000', // Rojo
        '#00ff00', // Verde
        '#0000ff', // Azul
        '#ff00ff', // ROSA
        '#ffff00', // Amarillo
        '#00ffff', // CELESTE
        '#ff8000', // Naranja
        '#800000',// MARRON
        '#FFFFFF',//BLANCO
        '#000000'//NEGRO
    ];
    // Función que maneja el envío del formulario
    async function onSubmit(data: ObjectSendDTO) {
        setLoading(true)
        console.log(data); // Aquí se muestra el contenido del formulario cuando se envía
        const color = getColorName(data.color)
        console.log(color)
        /*     const newData: ObjectSendDTO = {
                marca: data.marca,
                color: color,
                detalle: data.detalle,
                fecha_hora_encuentro: data.fecha_hora_encuentro,
                lugar_de_encuentro: data.lugar_de_encuentro,
                persona_que_encontro: data.persona_que_encontro,
                sector: data.sector,
                tipo_objeto: data.tipo_objeto
            } */
        //form donde se pasan los valores correctos
        var formdata = new FormData();
        formdata.append("marca", data.marca);
        formdata.append("color", color);
        formdata.append("detalle", data.detalle);
        formdata.append("fecha_hora_encuentro", data.fecha_hora_encuentro);
        formdata.append("lugar_de_encuentro", data.lugar_de_encuentro);
        formdata.append("persona_que_encontro", data.persona_que_encontro);
        formdata.append("sector", data.sector);
        formdata.append("tipo_objeto", data.tipo_objeto);
        try {
            var requestOptions: RequestInit = {
                method: 'POST',
                body: formdata,
                credentials: 'include',
                redirect: 'follow'
            };
            const response = await fetch(`${BaseUrl}/add_objeto_perdido`, requestOptions);
            if (!response.ok) {
                setLoading(false)
                throw new Error("Error al agregar objeto perdido");
            }
            /* const result =  */await response.text();
            /*  console.log(result, response) */
            toast.success("Objeto perdido cargado correctamente")
            /* toast.success('Nueva novedad agregada')
            */
            success()
        } catch (error) {
            console.error(error)
            toast.error('Error al cargar el objeto perdido')
        } finally {
            setLoading(false)
        }
    }

    //funcion que me retorna el string en relacion al hexadecimal 
    function getColorName(colorHex: string): string {
        switch (colorHex.toLowerCase()) {
            case '#ff0000':
                return 'ROJO';
            case '#00ff00':
                return 'VERDE';
            case '#0000ff':
                return 'AZUL';
            case '#ff00ff':
                return 'ROSA';
            case '#ffff00':
                return 'AMARILLO';
            case '#00ffff':
                return 'CELESTE';
            case '#ff8000':
                return 'NARANJA';
            case '#800000':
                return 'MARRÓN';
            case '#ffffff':
                return 'BLANCO';
            case '#000000':
                return 'NEGRO';
            default:
                return 'COLOR DESCONOCIDO'; // Si no se encuentra el color
        }
    }

    //esta funcion se llama cuando se envia la data y ahi se convierte el valor de el color
    function onChangeColor(color: string) {
        // Ahora se pasa el nombre del color al setValue
        setValue('color', color);
        var colorName = '';
        console.log(colorName)
        switch (color) {
            case '#ff0000':
                colorName = 'ROJO';
                break;
            case '#00ff00':
                colorName = 'VERDE';
                break;
            case '#0000ff':
                colorName = 'AZUL';
                break;
            case '#ff00ff':
                colorName = 'ROSA';
                break;
            case '#ffff00':
                colorName = 'AMARILLO';
                break;
            case '#00ffff':
                colorName = 'CELESTE';
                break;
            case '#ff8000':
                colorName = 'NARANJA';
                break;
            case '#800000':
                colorName = 'MARRÓN';
                break;
            case '#FFFFFF':
                colorName = 'BLANCO';
                break;
            case '#000000':
                colorName = 'NEGRO';
                break;
            default:
                colorName = 'COLOR DESCONOCIDO'; // En caso de que no se encuentre el color
                break;
        }
    }

    useEffect(() => {
        const now = new Date();
        const pad = (num: number) => num.toString().padStart(2, '0');

        const year = now.getFullYear();
        const month = pad(now.getMonth() + 1); // Mes empieza en 0
        const day = pad(now.getDate());
        const hours = pad(now.getHours());
        const minutes = pad(now.getMinutes());

        const localDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

        setValue('fecha_hora_encuentro', localDateTime);
        setValue('color', '#000000');
        setValue('marca', '');
    }, []);


    //valor que me actualiza siempre el dato para que sea asincronico 
    useEffect(() => {
        const subscription = watch((value) => setCurrentType(value.tipo_objeto || 'NO_SELECCIONADO'));
        return () => subscription.unsubscribe();
    }, [watch]);

    useEffect(() => {
        unregister('detalle'); // Desregistra el campo anterior
        unregister('marca');
    }, [currentType]); // Se ejecuta cuando cambia currentType

    return (
        <section className="fixed top-0 left-0 w-full h-full flex items-center justify-center  z-500">
            <div className="rounded-xl shadow-xl max-w-md w-full mx-4 md:mx-auto ">
                <div className=" bg-colorBlueComponents  rounded-md shadow min-h-60 ">
                    {loading && (
                        <LoaderRegisterHoverMobile />
                    )}
                    <div className="flex items-center justify-between p-4">
                        <button className="text-white bg-transparent   rounded-md text-sm h-8 w-8 ms-auto inline-flex justify-center items-center " onClick={onClose}>
                            <IoMdClose size={40} />
                        </button>
                    </div>
                    <h3 className="text-xl uppercase strokeWidth text-center text-white">Nuevo Objeto Perdido</h3>
                    <div className="p-4">
                        <form className="text-black text-xs uppercase " onSubmit={handleSubmit(onSubmit)}>
                            <ScrollContainer maxHeight="300px">
                                <div className="border border-stone-400 p-4 m-4 rounded-md">
                                    <div className="mb-4">
                                        <label className="block mb-1  text-white">Tipo de Objeto</label>
                                        <select
                                            {...register('tipo_objeto')}
                                            autoComplete='off'
                                            name="tipo_objeto"
                                            id='tipo_objeto'
                                            className="w-full px-4 py-2 border border-gray-300  rounded-md"
                                            onChange={(e) => { setValue('tipo_objeto', e.target.value), setIsOtherTypeObject(e.target.value === 'OTRO') }}
                                        >
                                            <option value="" disabled selected>Elegir una opcion</option>
                                            {optionsTypeObject.map((option) => (
                                                <option value={option.value}>{option.text}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {isOtherTypeObject && (
                                        <div className="mb-4">
                                            <label className="block mb-1 text-white">Especificar Tipo de Objeto</label>
                                            <input placeholder="Ingresar el nombre del objeto" className="w-full px-4 py-2 border border-gray-300 rounded-md" type="text" onChange={(e) => setValue('tipo_objeto', e.target.value)} />
                                        </div>
                                    )}
                                    <div className="mb-4">
                                        {currentType !== "DNI" ? (
                                            <>

                                                {!excludedTypes.includes(getValues('tipo_objeto')) ? (
                                                    <div className="my-4">
                                                        <label className="block mb-1 text-white">Especificar Marca</label>
                                                        <input placeholder="Ingresar el nombre del objeto" className="w-full px-4 py-2 border border-gray-300 rounded-md" type="text" onChange={(e) => setValue('marca', e.target.value)} />
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <label className="block mb-1  text-white">{currentType !== "DNI" ? "Marca" : "Escanear DNI"}</label>
                                                        <select
                                                            {...register('marca')}
                                                            autoComplete='off'
                                                            name="marca"
                                                            id='marca'
                                                            required
                                                            className="w-full px-4 py-2 border border-gray-300  rounded-md"
                                                            onChange={(e) => {
                                                                setValue('marca', e.target.value);
                                                                setIsOtherBrand(e.target.value.toUpperCase() === 'OTRO')
                                                            }}
                                                        >
                                                            <option value="" disabled selected>Elegir una opcion</option>
                                                            {currentType === 'CELULAR' && (
                                                                brandPhone.map((option, index) => (
                                                                    <option key={index} value={option.value}> {option.label}</option>
                                                                ))
                                                            )}
                                                            {currentType === "GORRA" && (
                                                                brandGap.map((option, index) => (
                                                                    <option key={index} value={option.value}> {option.label}</option>
                                                                ))
                                                            )}
                                                            {currentType === "CIGARRILLOS" && (
                                                                brandCigarette.map((option, index) => (
                                                                    <option key={index} value={option.value}> {option.label}</option>
                                                                ))
                                                            )}

                                                            {currentType === "CARTERA" && (
                                                                brandBriefcase.map((option, index) => (
                                                                    <option key={index} value={option.value}> {option.label}</option>
                                                                ))
                                                            )}
                                                            {currentType === "BUZO" && (
                                                                brandTopClothing.map((option, index) => (
                                                                    <option key={index} value={option.value}> {option.label}</option>
                                                                ))
                                                            )}
                                                            {currentType === "CAMPERA" && (
                                                                brandTopClothing.map((option, index) => (
                                                                    <option key={index} value={option.value}> {option.label}</option>
                                                                ))
                                                            )}

                                                        </select>
                                                    </div>
                                                )}
                                            </>

                                        ) : (
                                            <div className="mb-4">
                                                <label className="block mb-1 text-white">N° de Documento</label>
                                                <input placeholder="EJEMPLO: 44881304" className="w-full px-4 py-2 border border-gray-300 rounded-md" type="text" onChange={(e) => { console.log('cambios', e.target.value); setValue('detalle', e.target.value) }} />
                                            </div>
                                        )}
                                        {isOtherBrand && (
                                            <div className="my-4">
                                                <label className="block mb-1 text-white">Especificar Marca</label>
                                                <input placeholder="Ingresar el nombre del objeto" className="w-full px-4 py-2 border border-gray-300 rounded-md" type="text" onChange={(e) => setValue('marca', e.target.value)} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1  text-white">{currentType !== "DNI" ? 'Detalle' : 'Nombre Apellido'}</label>
                                        <textarea
                                            {...register(currentType !== "DNI" ? 'detalle' : 'marca')}
                                            autoComplete='off'
                                            name={currentType !== "DNI" ? 'detalle' : 'marca'}
                                            id={currentType !== "DNI" ? 'detalle' : 'marca'}
                                            className="w-full px-4 py-2 border border-gray-300  rounded-md"
                                        />
                                    </div>
                                    <div className="flex flex-wrap items-center justify-between">
                                        <label className="mb-1 text-white" htmlFor="">COLOR</label>
                                        <div className="flex bg-zinc-50 rounded-md mb-2 justify-between items-center mx-auto w-full">
                                            <label htmlFor="color" className="mx-2 text-zinc-500">{'Selecciona el color --->'}</label>
                                            <div
                                                className="w-8 h-8 rounded-full border border-black mx-2 my-2 cursor-pointer"
                                                style={{ backgroundColor: watch('color') || '#000000' }} // Usa watch para obtener el color actual
                                                onClick={() => setIsTableColors(!isTableColors)}
                                            />
                                        </div>

                                        {isTableColors && (
                                            <div className="flex flex-wrap justify-center bg-zinc-100 -mt-3 rounded-b-md shadow-xl ">
                                                {colors.map((color, index) => (
                                                    <div
                                                        key={index}
                                                        className="w-8 h-8 rounded-full border border-black cursor-pointer mx-3 my-4"
                                                        style={{ backgroundColor: color }}
                                                        onClick={() => {
                                                            onChangeColor(color);
                                                            setIsTableColors(false);
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1  text-white">Fecha y hora de encuentro</label>
                                        <input
                                            {...register('fecha_hora_encuentro')}
                                            autoComplete='off'
                                            type="datetime-local"
                                            name="fecha_hora_encuentro"
                                            required
                                            id='fecha_hora_encuentro'
                                            className="w-full px-4 py-2 border border-gray-300  rounded-md"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1  text-white">Lugar de encuentro</label>
                                        <select
                                            {...register('lugar_de_encuentro')}
                                            autoComplete='off'
                                            name="lugar_de_encuentro"
                                            required
                                            id='lugar_de_encuentro'
                                            onChange={(e) => { setValue('lugar_de_encuentro', e.target.value) }}
                                            className="w-full px-4 py-2 border border-gray-300  rounded-md"
                                        >
                                            <option value="" disabled selected>Elegir una opcion</option>
                                            {optionsTypeLocation.map((option) => (
                                                <option value={option.value}>{option.text}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1  text-white">Persona que lo encontró</label>
                                        <input
                                            {...register('persona_que_encontro')}
                                            autoComplete='off'
                                            name="persona_que_encontro"
                                            id='persona_que_encontro'
                                            required
                                            className="w-full px-4 py-2 border border-gray-300  rounded-md"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1  text-white">Sector</label>
                                        <select
                                            {...register('sector')}
                                            autoComplete='off'
                                            name="sector"
                                            id='sector'
                                            required
                                            className="w-full px-4 py-2 border border-gray-300  rounded-md"
                                        >
                                            <option value="" disabled selected>Elegir una opcion</option>
                                            <option value="ATC">ATC</option>
                                            <option value="BINGO">BINGO</option>
                                            <option value="CAJAS">CAJAS</option>
                                            <option value="ENFERMERÍA">ENFERMERÍA</option>
                                            <option value="GASTRONOMÍA">GASTRONOMÍA</option>
                                            <option value="LIMPIEZA">LIMPIEZA</option>
                                            <option value="MANTENIMIENTO">MANTENIMIENTO</option>
                                            <option value="M.O.">M.O.</option>
                                            <option value="SALA">SALA</option>
                                            <option value="SEGURIDAD">SEGURIDAD</option>
                                            <option value="SOPORTE SISTEMAS">SOPORTE SISTEMAS</option>
                                            <option value="TÉCNICOS">TÉCNICOS</option>
                                            <option value="TESORERÍA">TESORERÍA</option>
                                        </select>
                                    </div>
                                </div>
                            </ScrollContainer>
                            <div className="  mt-4 flex justify-center">
                                <button type="submit" className="bg-colorRed hover:scale-105 duration-100 rounded-md mx-auto  py-2 w-1/2 text-center  shadow-xl  flex justify-center items-center text-white" >Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
import { IoMdClose } from "react-icons/io";
import { ScrollContainer } from "../logic/ScrollContainer";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { LoaderRegisterHoverMobile } from "../loaders/LoaderRegister";
import { toast } from "react-toastify";
import { ObjectSendDTO } from "../../types/object";
import { optionsTypeLocation, optionsTypeObject } from "../../data/options";

interface propModal {
    onClose: () => void
    success: () => void
}

export function ModalAddObjectLost({ onClose }: propModal) {
    ///loading al mandar el mensaje al fetch
    const [loading, setLoading] = useState<boolean>(false)
    const { register, setValue, handleSubmit, watch, getValues } = useForm<ObjectSendDTO>()
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
        try {
            /* var requestOptions = {
      method: 'POST',
      body: formdata,
      credentials: 'include',
      redirect: 'follow'
    };
    try {
      const response = await fetch("http://127.0.0.1:5000/add_objeto_perdido", requestOptions);
      if (!response.ok) {
        throw new Error("Error al agregar objeto perdido");
      }
      //const result = await response.text();
      const confirmacion = await swal("Objeto perdido cargado correctamente", "", "success");
      if (confirmacion) {
        onClose()
        window.location.reload()
      }
    } catch (error) {
      console.error('Error:', error);
      swal("ERROR AL CARGAR EL FORMULARIO", "Por favor vuelva a cargarlo", "error")
    } */


            /* toast.success('Nueva novedad agregada')
            success() */
        } catch (error) {
            console.error(error)
            toast.error('Error en el envio')
        } finally {
            setLoading(false)
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
        //llamando a la funcion q trae la session del user
        setValue('color', 'NEGRO')
    }, [])

    return (
        <section className="fixed top-0 left-0 w-full h-full flex items-center justify-center  z-500">
            <div className="rounded-xl shadow-xl max-w-md w-full mx-4 md:mx-auto ">
                <div className=" bg-colorGray  rounded-md shadow min-h-60 ">
                    {loading == true && (
                        <LoaderRegisterHoverMobile />
                    )}
                    <div className="flex items-center justify-between p-4">
                        <button className="text-white bg-transparent   rounded-md text-sm h-8 w-8 ms-auto inline-flex justify-center items-center " onClick={onClose}>
                            <IoMdClose size={40} />
                        </button>
                    </div>
                    <h3 className="text-xl uppercase strokeWidth text-center text-white">Nuevo Objeto Perdido</h3>
                    <div className="p-4">
                        <form className="text-black text-xs uppercase" onSubmit={handleSubmit(onSubmit)}>
                            <ScrollContainer maxHeight="300px">
                                <div className="mb-4">
                                    <label className="block mb-1  text-white">Tipo de Objeto</label>
                                    <select
                                        {...register('tipo_objeto')}
                                        autoComplete='off'
                                        name="tipo_objeto"
                                        id='tipo_objeto'
                                        className="w-full px-4 py-2 border border-gray-300  rounded-md"
                                        onChange={(e) => setValue('tipo_objeto', e.target.value)}
                                    >
                                        <option value="" disabled selected>Elegir una opcion</option>
                                        {optionsTypeObject.map((option) => (
                                            <option value={option.value}>{option.text}</option>
                                        ))}
                                    </select>
                                </div>
                                {getValues('tipo_objeto') === 'OTRO' && (
                                    <div className="mb-4">
                                        <h1>ACA IRIA LA LOGICA</h1>

                                    </div>
                                )}
                                <div className="mb-4">
                                    <label className="block mb-1  text-white">Marca</label>
                                    <select
                                        {...register('marca')}
                                        autoComplete='off'
                                        name="marca"
                                        id='marca'
                                        className="w-full px-4 py-2 border border-gray-300  rounded-md"
                                    >
                                        <option value="" disabled selected>Elegir una opcion</option>
                                    </select>
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
                                    <label className="block mb-1  text-white">Detalle</label>
                                    <textarea
                                        {...register('detalle')}
                                        autoComplete='off'
                                        name="detalle"
                                        id='detalle'
                                        className="w-full px-4 py-2 border border-gray-300  rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1  text-white">Fecha y hora de encuentro</label>
                                    <input
                                        {...register('fecha_hora_encuentro')}
                                        autoComplete='off'
                                        type="datetime-local"
                                        name="fecha_hora_encuentro"
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
                                        id='lugar_de_encuentro'
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
                                        className="w-full px-4 py-2 border border-gray-300  rounded-md"
                                    >
                                        <option value="" disabled selected>Elegir una opcion</option>
                                    </select>
                                </div>
                            </ScrollContainer>
                            <div className="  mt-4 flex justify-center">
                                <button type="submit" className="bg-colorRed rounded-md mx-auto  py-2 w-1/2 text-center  shadow-xl  flex justify-center items-center text-white" >Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
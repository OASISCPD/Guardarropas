import { IoMdClose, IoMdCloudUpload } from "react-icons/io";
import { ScrollContainer } from "../logic/ScrollContainer";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { LoaderRegisterHoverMobile } from "../loaders/LoaderRegister";
import { toast } from "react-toastify";
import { ObjectSendDTO } from "../../types/object";
import { brandBriefcase, brandCigarette, brandGap, brandPhone, brandTopClothing, excludedTypes, optionsTypeLocation, optionsTypeObject, phoneModels } from "../../data/options";
import { BaseUrl } from "../../logic/api";
import { InputEmpleadoModal } from "../../shared/InputEmpleadoModal";
import { inputStyle } from "../../utils/style";

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
    // Nuevos estados para los modelos de celulares
    const [selectedBrand, setSelectedBrand] = useState<string>('')
    const [isOtherModel, setIsOtherModel] = useState<boolean>(false)
    // Estado para la imagen
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string>('')
    const [selectedModel, setSelectedModel] = useState<string>('')
    // Estado para validar el empleado
    const [empleadoError, setEmpleadoError] = useState<string>('')

    ///loading al mandar el mensaje al fetch
    const [loading, setLoading] = useState<boolean>(false)
    //constante que maneja el estado de si mostrar o no los colores
    const [isTableColors, setIsTableColors] = useState<boolean>(false)
    //array de colores
    // Primero, mejora el array de colores con nombres y mejor organización
    const colors = [
        { hex: '#ff0000', name: 'Rojo' },
        { hex: '#00ff00', name: 'Verde' },
        { hex: '#0000ff', name: 'Azul' },
        { hex: '#ff00ff', name: 'Rosa' },
        { hex: '#ffff00', name: 'Amarillo' },
        { hex: '#00ffff', name: 'Celeste' },
        { hex: '#ff8000', name: 'Naranja' },
        { hex: '#800000', name: 'Marrón' },
        { hex: '#FFFFFF', name: 'Blanco' },
        { hex: '#000000', name: 'Negro' },
    ];

    // Función para manejar la selección de imagen
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Validar tipo de archivo
            if (!file.type.startsWith('image/')) {
                toast.error('Por favor selecciona solo archivos de imagen');
                return;
            }
            // Validar tamaño (máximo 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('La imagen debe ser menor a 5MB');
                return;
            }

            setSelectedImage(file);

            // Crear preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Función para remover la imagen
    const removeImage = () => {
        setSelectedImage(null);
        setImagePreview('');
    };

    // Función que maneja el envío del formulario
    async function onSubmit(data: ObjectSendDTO) {
        // Validar que se haya seleccionado un empleado
        if (!data.persona_que_encontro) {
            setEmpleadoError('Debe seleccionar un empleado');
            toast.error('Debe seleccionar un empleado');
            return;
        }

        setEmpleadoError('');
        setLoading(true)
        console.log(data); // Aquí se muestra el contenido del formulario cuando se envía
        const color = getColorName(data.color)
        console.log(color)

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

        // Agregar imagen si existe
        if (selectedImage) {
            formdata.append("imagen", selectedImage);
        }

        console.log("DATA", formdata, data);
        setLoading(false)

        return
        try {
            var requestOptions: RequestInit = {
                method: 'POST',
                body: formdata,
                credentials: 'include',
                redirect: 'follow'
            };
            console.log("DATA", formdata);

            // return // Comentado temporalmente para testing
            const response = await fetch(`${BaseUrl}/add_objeto_perdido`, requestOptions);
            if (!response.ok) {
                setLoading(false)
                throw new Error("Error al agregar objeto perdido");
            }
            await response.text();
            toast.success("Objeto perdido cargado correctamente")
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
        setSelectedBrand('');
        setSelectedModel('');
        setIsOtherModel(false);
        setSelectedImage(null);
        setImagePreview('');
    }, [currentType]); // Se ejecuta cuando cambia currentType

    return (
        <section className="fixed top-0 left-0 w-full h-full flex items-center justify-center  z-500">
            <div className="rounded-xl shadow-xl max-w-md w-full mx-4 md:mx-auto ">
                <div className=" bg-slate-900 border border-  rounded-md shadow min-h-60 ">
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
                                            className={inputStyle}
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
                                            <input placeholder="Ingresar el nombre del objeto" className={inputStyle} onChange={(e) => setValue('tipo_objeto', e.target.value)} />
                                        </div>
                                    )}
                                    <div className="mb-4">
                                        {currentType !== "DNI" ? (
                                            <>

                                                {!excludedTypes.includes(getValues('tipo_objeto')) ? (
                                                    <div className="my-4">
                                                        <label className="block mb-1 text-white">Especificar Marca</label>
                                                        <input placeholder="Ingresar el nombre del objeto" className={inputStyle} onChange={(e) => setValue('marca', e.target.value)} />
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
                                                            className={inputStyle}
                                                            onChange={(e) => {
                                                                setValue('marca', e.target.value);
                                                                setIsOtherBrand(e.target.value.toUpperCase() === 'OTRO');
                                                                setSelectedBrand(e.target.value);
                                                                setSelectedModel('');
                                                                setIsOtherModel(false);
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

                                                        {/* Select de modelos para celulares */}
                                                        {currentType === 'CELULAR' && selectedBrand && selectedBrand !== 'OTRO' && (
                                                            <div className="mt-4">
                                                                <label className="block mb-1 text-white">Modelo</label>
                                                                <select
                                                                    value={selectedModel}
                                                                    onChange={(e) => {
                                                                        setSelectedModel(e.target.value);
                                                                        setIsOtherModel(e.target.value === 'OTRO');
                                                                        if (e.target.value !== 'OTRO') {
                                                                            const modelLabel = phoneModels[selectedBrand]?.find(m => m.value === e.target.value)?.label || e.target.value;
                                                                            setValue('detalle', `${selectedBrand} ${modelLabel}`);
                                                                        }
                                                                    }}
                                                                    className={inputStyle}
                                                                    required
                                                                >
                                                                    <option value="" disabled>Elegir modelo</option>
                                                                    {phoneModels[selectedBrand]?.map((model, index) => (
                                                                        <option key={index} value={model.value}>{model.label}</option>
                                                                    ))}
                                                                    <option value="OTRO">Otro</option>
                                                                </select>
                                                            </div>
                                                        )}

                                                        {/* Campo de texto para modelo personalizado */}
                                                        {currentType === 'CELULAR' && isOtherModel && (
                                                            <div className="mt-4">
                                                                <label className="block mb-1 text-white">Especificar Modelo</label>
                                                                <input
                                                                    placeholder="Ej: iPhone 15 Pro Max"
                                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                                                    type="text"
                                                                    onChange={(e) => setValue('detalle', `${selectedBrand} ${e.target.value}`)}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </>

                                        ) : (
                                            <div className="mb-4">
                                                <label className="block mb-1 text-white">N° de Documento</label>
                                                <input placeholder="EJEMPLO: 44881304" className={inputStyle} onChange={(e) => { console.log('cambios', e.target.value); setValue('detalle', e.target.value) }} />
                                            </div>
                                        )}
                                        {isOtherBrand && (
                                            <div className="my-4">
                                                <label className="block mb-1 text-white">Especificar Marca</label>
                                                <input placeholder="Ingresar el nombre del objeto" className={inputStyle} onChange={(e) => setValue('marca', e.target.value)} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1  text-white">{currentType !== "DNI" ? 'Detalle' : 'Nombre Apellido'}</label>
                                        <textarea
                                            {...register(currentType !== "DNI" ? 'detalle' : 'marca')}
                                            autoComplete='off'
                                            placeholder="detalle del objeto"
                                            name={currentType !== "DNI" ? 'detalle' : 'marca'}
                                            id={currentType !== "DNI" ? 'detalle' : 'marca'}
                                            className={inputStyle}
                                        />
                                    </div>
                                    {/* COLOIRES */}
                                    <div className="mb-4">
                                        <label className="block mb-2 text-white font-medium">Color del Objeto</label>

                                        {/* Selector principal con tema slate */}
                                        <div className="relative">
                                            <div
                                                className="flex items-center justify-between bg-slate-800 border border-slate-600 rounded p-3 cursor-pointer hover:border-slate-500 focus:ring-2 focus:ring-slate-500 transition-all duration-200"
                                                onClick={() => setIsTableColors(!isTableColors)}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div
                                                        className="w-5 h-5 rounded-full border-2 border-slate-500 shadow-inner flex-shrink-0"
                                                        style={{ backgroundColor: watch('color') || '#000000' }}
                                                    />
                                                    <span className="text-slate-100 font-medium">
                                                        {watch('color') ? getColorName(watch('color') || '') : 'Seleccionar color'}
                                                    </span>
                                                </div>
                                                <svg
                                                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isTableColors ? 'rotate-180' : ''}`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>

                                            {/* Paleta de colores con tema slate */}
                                            {isTableColors && (
                                                <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-2xl p-4">
                                                    <div className="grid grid-cols-5 gap-3">
                                                        {colors.map((color, index) => {
                                                            const isSelected = watch('color') === color.hex;
                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className="flex flex-col items-center space-y-1"
                                                                >
                                                                    <div
                                                                        className={`w-6 h-6 rounded-full cursor-pointer shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 border-2 ${isSelected
                                                                            ? 'border-slate-400 ring-2 ring-slate-500'
                                                                            : color.hex === '#FFFFFF'
                                                                                ? 'border-slate-500'
                                                                                : 'border-slate-600'
                                                                            }`}
                                                                        style={{ backgroundColor: color.hex }}
                                                                        onClick={() => {
                                                                            onChangeColor(color.hex);
                                                                            setIsTableColors(false);
                                                                        }}
                                                                        title={color.name}
                                                                    />
                                                                    <span className="text-[10px] text-slate-400 font-medium text-center leading-tight">
                                                                        {color.name}
                                                                    </span>
                                                                    {isSelected && (
                                                                        <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>

                                                    {/* Botón para cerrar con tema slate */}
                                                    <div className="mt-4 text-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => setIsTableColors(false)}
                                                            className="text-slate-400 hover:text-slate-300 text-sm font-medium transition-colors"
                                                        >
                                                            Cerrar paleta
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Indicador visual con tema slate */}
                                        {watch('color') && (
                                            <div className="mt-2 flex items-center space-x-2 text-sm text-slate-400">
                                                <span>Color seleccionado:</span>
                                                <div
                                                    className="w-4 h-4 rounded-full border border-slate-500"
                                                    style={{ backgroundColor: watch('color') }}
                                                />
                                                <span className="font-medium text-slate-100">
                                                    {getColorName(watch('color') || '')}
                                                </span>
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
                                            className={inputStyle}
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
                                            className={inputStyle}
                                        >
                                            <option value="" disabled selected>Elegir una opcion</option>
                                            {optionsTypeLocation.map((option) => (
                                                <option value={option.value}>{option.text}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1 text-white">Persona que lo encontró</label>
                                        <InputEmpleadoModal
                                            onChange={(legajo: string) => {
                                                console.log('Legajo seleccionado:', legajo);
                                                setValue('persona_que_encontro', legajo);
                                                if (legajo) {
                                                    setEmpleadoError('');
                                                }
                                            }}
                                            value={watch('persona_que_encontro') || ''}
                                            error={empleadoError}
                                            initialLegajo=""
                                            placeholder="Buscar empleado por legajo o nombre..."
                                            required
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
                                            className={inputStyle}
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

                                    {/* Sección de upload de imagen */}
                                    <div className="mb-4">
                                        <label className="block mb-2 text-white">Imagen del Objeto (Opcional)</label>
                                        <div className="border-2 border-dashed border-slate-300 bg-slate-900/20 hover:bg-slate-900/50 cursor-pointer rounded-lg p-4 duration-300">
                                            {!selectedImage ? (
                                                <div className="text-center">
                                                    <IoMdCloudUpload className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                                                    <div className="flex justify-center">
                                                        <label className="cursor-pointer bg-slate-500 text-white px-4 py-2 rounded-md hover:bg-slate-600 transition-colors">
                                                            <input
                                                                type="file"
                                                                className="hidden"
                                                                accept="image/*"
                                                                onChange={handleImageChange}
                                                            />
                                                            Seleccionar imagen
                                                        </label>
                                                    </div>
                                                    <p className="text-slate-400 text-xs mt-2">
                                                        JPG, PNG, GIF hasta 5MB
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="relative">
                                                    <img
                                                        src={imagePreview || ''}
                                                        alt="Vista previa"
                                                        className="max-w-full max-h-48 mx-auto rounded-md"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={removeImage}
                                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                                    >
                                                        <IoMdClose size={16} />
                                                    </button>
                                                    <p className="text-center text-white text-sm mt-2">
                                                        {selectedImage.name}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </ScrollContainer>
                            <div className="  mt-4 flex justify-center">
                                <button type="submit" className="bg-gradient-to-r from-colorOrange to-orange-600 hover:from-orange-600 hover:to-orange-700 hover:scale-105 duration-100 rounded-md mx-auto  py-2 w-1/2 text-center  shadow-xl  flex justify-center items-center text-white" >Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
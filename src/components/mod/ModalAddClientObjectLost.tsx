import { useEffect, useRef, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { BaseUrl } from '../../logic/api';
import { ScrollContainer } from '../logic/ScrollContainer';

interface modalProps {
    onClose: () => void
    id_objeto_perdido: number
}

export function ModalAddClientObjectLost({ onClose, id_objeto_perdido }: modalProps) {
    const { setValue, getValues, register } = useForm();
    const [modeScan, setModeScan] = useState(false)
    const [modeForeign, setModeForeign] = useState(false);
    const [modeManual, setModeManual] = useState(false)
    const [loading, setLoading] = useState(false)
    //refencia al input 
    const inputRef = useRef<any>(null);

    const handleCheckboxChange = () => {
        setModeForeign(prevState => !prevState);
    };
    const handleCheckboxChangeManual = () => {
        setModeManual(prevState => !prevState)
    }
    function isAdult(fecha_nacimiento: string): boolean {
        const birth_date = new Date(fecha_nacimiento);
        const date_now = new Date();
        // Calcular la edad
        const age = date_now.getFullYear() - birth_date.getFullYear();
        // Comparar las fechas de nacimiento y actual
        birth_date.setFullYear(date_now.getFullYear()); // Establecer el año de nacimiento al año actual
        const isBeforeBirthday = birth_date.getTime() > date_now.getTime();
        if (age > 18 || (age === 18 && !isBeforeBirthday)) {
            return true; // Mayor de edad
        } else {
            return false; // Menor de edad
        }
    }

    // Lógica del escáner
    async function handleCadenaInputChangeScan(e: any) {
        e.preventDefault()
        const newValue = e.target.value
        procesarCadenaScan(newValue)
    }
    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendDataScanCheck();
        }
    };

    function procesarCadenaScan(cadena: any) {
        cadena = cadena.replaceAll('"', "@");
        let codigo = cadena.split("@");
        if (codigo[2].length === 1) {
            let fecha = codigo[7]
                .replaceAll("-", "/")
                .split("/")
                .reverse()
                .join("-");
            setCadenaValues(codigo[1], codigo[4], codigo[5], codigo[8], fecha);
        }
        else {
            if (codigo[1].length === 1) {
                let fecha = codigo[10]
                    .replaceAll("-", "/")
                    .split("/")
                    .reverse()
                    .join("-");
                setCadenaValues(codigo[8], codigo[5], codigo[6], codigo[7], fecha);
            }
            else {
                let fecha = codigo[6]
                    .replaceAll("-", "/")
                    .split("/")
                    .reverse()
                    .join("-");
                setCadenaValues(codigo[4], codigo[1], codigo[2], codigo[3], fecha);
            }
        }
    }

    async function sendDataScanCheck() {
        const client = getValues()
        console.log(client)
        console.log(client.n_documento)
        check_dni(client.n_documento)
    }
    async function sendDataManualForeign() {
        const client = getValues()
        console.log(client)
        add_new_client_foreign()
    }
    async function sendDataManual() {
        const client = getValues()
        console.log(client)
        add_new_client()
    }
    async function check_dni(dni: string) {
        setLoading(true)
        if (!dni) {
            swal('No se proporciono ningun valor', 'escanear numero de documento.', 'error')
            setLoading(false)
            return
        }
        try {
            const response = await fetch(`${BaseUrl}traer_cliente_x_dni?dni=${dni}`, {
                method: "GET",
                credentials: "include",
                mode: "cors",
            });
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            const data = await response.json();
            if (Array.isArray(data) && data.length === 0) {
                console.log('No se encontró ningún cliente con el DNI proporcionado.');
                /* COMPLETAR CON NOSIS */
                autoCompleteByNosis(dni)

            } else {
                /*    setClient(data[0]); */
                /*    console.log('response data', data[0]); */
                add_client_in_object(data[0].id_cliente)
            }
        } catch (error) {
            console.error('Hubo un problema al realizar la solicitud. Inténtalo de nuevo más tarde.');
        }
    }
    async function autoCompleteByNosis(dni: string) {
        /*  console.log(dni) */
        const res = await fetch(`${BaseUrl}traer_datos_nosis?dni=${dni}`, {
            method: "GET",
            credentials: "include",
            mode: "cors",
        })
        const data = await res.json()
        console.log(data)
        if ((Array.isArray(data) && data.length === 0) || (Object.keys(data).length === 0 && data.constructor === Object)) {
            swal('no se pudo completar automaticamente el cliente', 'ya que no ha sido agregado anteriormente.. Debera registrarlo por unica vez', 'warning')
            setLoading(false)
            /* SEGUIR CON LA LOGICA DE SCANNEAR */
            setModeScan(true)
            return
        } else {
            console.log('response data', data);
            await setCadenaValuesNosis(data.VI_DNI, data.VI_Apellido, data.VI_Nombre, data.VI_Sexo, data.VI_FecNacimiento, data.VI_DomAF_Prov, data.VI_DomAF_Loc, data.VI_DomAF_Calle + data.VI_DomAF_Nro)
        }
    }
    async function add_client_in_object(id: number) {
        const data = getValues();
        console.log(data)
        console.log('data a enviar en el fetch', id_objeto_perdido, id)
        const res = await fetch(`${BaseUrl}actualizar_estado_objeto_retirado?id_objeto_perdido=${id_objeto_perdido}&id_cliente=${id}`, {
            method: "GET",
            credentials: "include",
            mode: "cors",
        })
        if (!res.ok) {
            await swal('Error al retirar el objeto', 'vuelva a intentarlo nuevamen  te', 'error')
            throw new Error(`Http Status ${res.status}`)
        }
        setLoading(false)
        await swal('Objeto retirado y asociado correctamente', `se asocio a ${data.nombre} ${data.apellido} ${data.n_documento}`, 'success')
        window.location.reload()

        /* REALIZAR LA SENTENCIA QUE CAMBIA EL VALOR Y AGREGA EL CLIENTE */
    }
    async function setCadenaValuesNosis(n_documento: string, apellido: string, nombre: string, genero: string, fecha: string, provincia: string, localidad: string, direccion: string,) {
        // Aquí puedes implementar la lógica de configuración de valores
        /*  console.log(n_documento, '\n', apellido, '\n', nombre, '\n', genero, '\n', fecha); */
        await setValue('n_documento', n_documento)
        await setValue('tipo_documento', 'dni')
        await setValue('apellido', apellido)
        await setValue('nombre', nombre)
        await setValue('genero', genero)
        await setValue('fecha_nacimiento', fecha)
        await setValue('provincia', provincia)
        await setValue('localidad', localidad)
        await setValue('direccion', direccion)
        await setValue('celular', '')
        await setTimeout(() => {
            add_new_client()
        }, 2000);

    }

    async function setCadenaValues(n_documento: string, apellido: string, nombre: string, genero: string, fecha: string) {
        await setValue('n_documento', n_documento)
        await setValue('tipo_documento', 'dni')
        await setValue('apellido', apellido)
        await setValue('nombre', nombre)
        await setValue('genero', genero)
        await setValue('fecha_nacimiento', fecha)
        await setValue('provincia', '')
        await setValue('localidad', '')
        await setValue('direccion', '')
        await setValue('celular', '')
    }
    async function add_new_client() {
        const client = await getValues();
        console.log('agregando cliente nuevo, sus valores--------->', client);
        const requiredFields = ['apellido', 'fecha_nacimiento', 'genero', 'n_documento', 'nombre', 'tipo_documento'];
        for (const field of requiredFields) {
            if (!client[field]) {
                console.log(`El campo ${field} está incompleto`);
                await swal(`El campo ${field} está incompleto`, '', 'warning')
                setLoading(false);
                return;
            }
        }
        if (isAdult(client.fecha_nacimiento)) {
            console.log('es mayor de edad')
            const formData = new URLSearchParams({
                n_documento: client.n_documento || '',
                apellido: client.apellido || '',
                nombre: client.nombre || '',
                genero: client.genero || '',
                fecha_nacimiento: client.fecha_nacimiento || '',
                localidad: client.localidad || '',
                provincia: client.provincia || '',
                direccion: client.direccion || '',
                celular: client.celular || '',
                tipo_documento: client.tipo_documento || '',
            });

            const requestOptions: RequestInit = {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
                credentials: "include",
                redirect: "follow",
            };
            try {
                const response = await fetch(
                    `${BaseUrl}/guardar_cliente_por_objetos_perdidos`,
                    requestOptions
                );
                if (!response.status) {
                    throw new Error(`Http Status ${response.status}`)
                }
                const data = await response.json()
                add_client_in_object(data.id_cliente)
            } catch (error) {
                console.error(error)
            }
        }
        else {
            swal('El cliente es menor de edad', 'revisa la fecha de nacimiento', 'error')
            return
        }

    }
    async function add_new_client_foreign() {
        const client = await getValues();
        console.log('agregando cliente nuevo, sus valores--------->', client);
        // Verificar que todos los campos estén completos
        const requiredFields = ['apellido', 'fecha_nacimiento', 'genero', 'n_documento', 'nombre', 'tipo_documento'];
        for (const field of requiredFields) {
            if (!client[field]) {
                console.log(`El campo ${field} está incompleto`);
                await swal(`El campo ${field} está incompleto`, '', 'warning')
                setLoading(false);
                return;
            }
        }
        if (isAdult(client.fecha_nacimiento)) {
            const formData = new URLSearchParams({
                n_documento: `${client.n_documento}_E` || '',
                apellido: client.apellido || '',
                nombre: client.nombre || '',
                genero: client.genero || '',
                fecha_nacimiento: client.fecha_nacimiento || '',
                localidad: client.localidad || '',
                provincia: client.provincia || '',
                direccion: client.direccion || '',
                celular: client.celular || '',
                tipo_documento: client.tipo_documento || '',
            });

            const requestOptions: RequestInit = {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
                credentials: "include",
                redirect: "follow",
            };
            try {
                const response = await fetch(
                    `${BaseUrl}/guardar_cliente_por_objetos_perdidos`,
                    requestOptions
                );
                if (!response.status) {
                    throw new Error(`Http Status ${response.status}`)
                }
                const data = await response.json()
                add_client_in_object(data.id_cliente)
            } catch (error) {
                console.error(error)
            }
        }
        else {
            swal('El cliente es menor de edad', 'revisa la fecha de nacimiento', 'error')
            return
        }
    }
    useEffect(() => {
        if (inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        console.log(modeForeign)
    }, [modeForeign])
    return (
        <section className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 z-10  overflow-auto text-white">
            <div className="bg-colorGray rounded-md shadow-md max-w-md px-4 pt-4 ">
                {loading && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div role="status">
                            <svg
                                aria-hidden="true"
                                className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )}
                <div className="">
                    <div className="flex justify-end">
                        <IoMdClose
                            className="text-white  cursor-pointer hover:text-gray-300 duration-100"
                            onClick={onClose}
                            size={30}
                        />
                    </div>
                    <div className="flex justify-center">
                        <h1 className="text-xl  uppercase mb-2">Buscar cliente</h1>
                    </div>
                    <ScrollContainer maxHeight='400px'>
                        {!modeScan ? (
                            <form className=" mb-8 mx-8 "/*  onSubmit={checkDni} */>
                                <>
                                    <label className="inline-flex items-center cursor-pointer my-2.5">
                                        <div className='inline-flex items-center'>
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={modeManual}
                                                onChange={handleCheckboxChangeManual}
                                            />
                                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            <span className="ms-3  ">Ingreso Manual</span>
                                        </div>
                                    </label>

                                    <label className="inline-flex items-center cursor-pointer my-2.5">
                                        <div className='inline-flex items-center'>
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={modeForeign}
                                                onChange={handleCheckboxChange}
                                            />
                                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            <span className="ms-3  ">Es EXTRANJERO y sin DNI argentino</span>
                                        </div>
                                    </label>
                                    {!modeForeign && !modeManual ? (
                                        <>
                                            <div className=" text-black my-2 ">
                                                <label className='text-white  ' htmlFor="">Escanear DNI</label>
                                                <input ref={inputRef} autoComplete='off' type="text" onChange={handleCadenaInputChangeScan}
                                                    onKeyDown={handleKeyDown} className='w-full my-2 p-2 rounded-md ' />
                                            </div>

                                            <div className="flex justify-center my-8">
                                                <button onClick={sendDataScanCheck} type='button' className="w-full  bg-colorRed hover:scale-105 duration-100 text-white px-8 py-2 rounded-md">Buscar</button>
                                            </div>
                                        </>
                                    ) : modeForeign ? (
                                        <>
                                            <div className="text-black my-2 ">
                                                <label className='text-white' htmlFor="tipo_documento">Tipo de documento</label>
                                                <select
                                                    id="tipo_documento"
                                                    {...register('tipo_documento')}
                                                    className='w-full my-2 p-2 rounded-md text-black'
                                                >
                                                    <option disabled selected value="">Elegir tipo</option>
                                                    <option value={'Pasaporte'}>Pasaporte</option>
                                                    <option value={'DNI'}>DNI</option>
                                                    <option value={'CUIL'}>CUIL</option>
                                                </select>
                                            </div>
                                            <div className=" text-black my-2    ">
                                                <label className='text-white  ' htmlFor="">DNI </label>
                                                <input autoComplete='off' type="text" /* defaultValue={formDataScan.n_documento} */ {...register('n_documento')} /* onChange={handleCadenaInputChange} */ className='w-full my-2 p-2 rounded-md' />
                                            </div>
                                            <div className=" text-black my-2  ">
                                                <label className='text-white  ' htmlFor="">Nombre</label>
                                                <input autoComplete='off' type="text" /* defaultValue={formDataScan.nombre} */ {...register('nombre')} /* onChange={handleCadenaInputChange} */ className='w-full my-2 p-2 rounded-md' />
                                            </div>
                                            <div className=" text-black my-2  ">
                                                <label className='text-white  ' htmlFor="">Apellido</label>
                                                <input autoComplete='off' type="text" /* defaultValue={formDataScan.apellido} */ {...register('apellido')} /* onChange={handleCadenaInputChange} */ className='w-full my-2 p-2 rounded-md' />
                                            </div>
                                            <div className="text-black my-2 ">
                                                <label className='text-white' htmlFor="genero">Género</label>
                                                <select
                                                    id="genero"
                                                    {...register('genero')}
                                                    className='w-full my-2 p-2 rounded-md'
                                                >
                                                    <option disabled selected value="">Elegir genero</option>
                                                    <option value="F">Femenino</option>
                                                    <option value="M">Masculino</option>
                                                </select>
                                            </div>
                                            <div className=" text-black my-2  ">
                                                <label className='text-white  ' htmlFor="">Fecha de nacimiento</label>
                                                <input autoComplete='off' type="date" /* defaultValue={formDataScan.fecha_nacimiento} */ {...register('fecha_nacimiento')} /* onChange={handleCadenaInputChange} */ className='w-full my-2 p-2 rounded-md' />
                                            </div>
                                            <div className="flex justify-center my-8">
                                                <button onClick={sendDataManualForeign} type='button' className="w-full bg-colorRed hover:scale-105 duration-100  text-white px-8 py-2 rounded-md">Registrar Extranjero</button>
                                            </div>
                                        </>
                                    ) : modeManual ? (
                                        <>
                                            <div className="text-black my-2 ">
                                                <label className='text-white' htmlFor="tipo_documento">Tipo de documento</label>
                                                <select
                                                    id="tipo_documento"
                                                    {...register('tipo_documento')}
                                                    className='w-full my-2 p-2 rounded-md'
                                                >
                                                    <option disabled selected value="">Elegir tipo</option>
                                                    <option value={'Pasaporte'}>Pasaporte</option>
                                                    <option value={'DNI'}>DNI</option>
                                                    <option value={'CUIL'}>CUIL</option>
                                                </select>
                                            </div>
                                            <div className=" text-black my-2    ">
                                                <label className='text-white  ' htmlFor="">DNI </label>
                                                <input autoComplete='off' type="text" /* defaultValue={formDataScan.n_documento} */ {...register('n_documento')} /* onChange={handleCadenaInputChange} */ className='w-full my-2 p-2 rounded-md' />
                                            </div>
                                            <div className=" text-black my-2  ">
                                                <label className='text-white  ' htmlFor="">Nombre</label>
                                                <input autoComplete='off' type="text" /* defaultValue={formDataScan.nombre} */ {...register('nombre')} /* onChange={handleCadenaInputChange} */ className='w-full my-2 p-2 rounded-md' />
                                            </div>
                                            <div className=" text-black my-2  ">
                                                <label className='text-white  ' htmlFor="">Apellido</label>
                                                <input autoComplete='off' type="text" /* defaultValue={formDataScan.apellido} */ {...register('apellido')} /* onChange={handleCadenaInputChange} */ className='w-full my-2 p-2 rounded-md' />
                                            </div>
                                            <div className="text-black my-2 ">
                                                <label className='text-white' htmlFor="genero">Género</label>
                                                <select
                                                    id="genero"
                                                    {...register('genero')}
                                                    className='w-full my-2 p-2 rounded-md'
                                                >
                                                    <option disabled selected value="">Elegir genero</option>
                                                    <option value="F">Femenino</option>
                                                    <option value="M">Masculino</option>
                                                </select>
                                            </div>
                                            <div className=" text-black my-2  ">
                                                <label className='text-white  ' htmlFor="">Fecha de nacimiento</label>
                                                <input autoComplete='off' type="date" /* defaultValue={formDataScan.fecha_nacimiento} */ {...register('fecha_nacimiento')} /* onChange={handleCadenaInputChange} */ className='w-full my-2 p-2 rounded-md' />
                                            </div>
                                            <div className="flex justify-center my-8">
                                                <button onClick={sendDataManual} type='button' className="w-full  bg-colorRed hover:scale-105 duration-100 text-white px-8 py-2 rounded-md">Registrar</button>
                                            </div>
                                        </>
                                    ) : (<>
                                    </>)}
                                </>
                            </form>
                        ) : (
                            <form className=" mb-8 mx-8 "/*  onSubmit={checkDni} */>
                                <>
                                    <div className="text-black my-2 ">
                                        <label className='text-white' htmlFor="tipo_documento">Tipo de documento</label>
                                        <select
                                            id="tipo_documento"
                                            {...register('tipo_documento')}
                                            className='w-full my-2 p-2 rounded-md'
                                        >
                                            <option disabled selected value="text-black">Elegir tipo</option>
                                            <option value={'Pasaporte'}>Pasaporte</option>
                                            <option value={'DNI'}>DNI</option>
                                            <option value={'CUIL'}>CUIL</option>
                                        </select>
                                    </div>
                                    <div className=" text-black my-2    ">
                                        <label className='text-white  ' htmlFor="">DNI</label>
                                        <input autoComplete='off' type="text" /* defaultValue={formDataScan.n_documento} */ {...register('n_documento')} /* onChange={handleCadenaInputChange} */ className='w-full my-2 p-2 rounded-md' />
                                    </div>
                                    <div className=" text-black my-2  ">
                                        <label className='text-white  ' htmlFor="">Nombre</label>
                                        <input autoComplete='off' type="text" /* defaultValue={formDataScan.nombre} */ {...register('nombre')} /* onChange={handleCadenaInputChange} */ className='w-full my-2 p-2 rounded-md' />
                                    </div>
                                    <div className=" text-black my-2  ">
                                        <label className='text-white  ' htmlFor="">Apellido</label>
                                        <input autoComplete='off' type="text" /* defaultValue={formDataScan.apellido} */ {...register('apellido')} /* onChange={handleCadenaInputChange} */ className='w-full my-2 p-2 rounded-md' />
                                    </div>
                                    <div className="text-black my-2 ">
                                        <label className='text-white' htmlFor="genero">Género</label>
                                        <select
                                            id="genero"
                                            {...register('genero')}
                                            className='w-full my-2 p-2 rounded-md'
                                        >
                                            <option disabled selected value="">elegir genero </option>
                                            <option value="F">Femenino</option>
                                            <option value="M">Masculino</option>
                                        </select>
                                    </div>
                                    <div className=" text-black my-2  ">
                                        <label className='text-white  ' htmlFor="">Fecha de nacimiento</label>
                                        <input autoComplete='off' type="date" /* defaultValue={formDataScan.fecha_nacimiento} */ {...register('fecha_nacimiento')} /* onChange={handleCadenaInputChange} */ className='w-full my-2 p-2 rounded-md' />
                                    </div>
                                    <div className="flex justify-center my-8">
                                        <button onClick={sendDataManual} type='button' className="w-full bg-colorRed hover:scale-105 duration-100 text-white px-8 py-1 rounded-xl">Registrar</button>
                                    </div>
                                </>
                            </form>
                        )}
                    </ScrollContainer>
                </div>
            </div>
        </section>
    )
}




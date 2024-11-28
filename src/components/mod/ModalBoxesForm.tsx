import { useForm } from "react-hook-form";
import { IoMdAddCircle, IoMdClose } from "react-icons/io";
import { ScrollContainer } from "../logic/ScrollContainer";
import { TiDeleteOutline } from "react-icons/ti";

export interface FormDataDTO {
    prenda: string
}

export interface propForm {
    id: number
    onClose: () => void
}


export function ModalBoxes({ onClose, id }: propForm) {
    const { register, setValue, getValues, handleSubmit } = useForm<FormDataDTO>()

    // Función que maneja el envío del formulario
    function onSubmit(data: FormDataDTO) {
        console.log(data); // Aquí se muestra el contenido del formulario cuando se envía
    }
    return (
        <section className="fixed top-0 left-0 w-full h-full flex items-center justify-center  z-500">
            <div className="rounded-xl shadow-xl max-w-md w-full mx-4 md:mx-auto ">
                <div className=" bg-colorGray  rounded-md shadow min-h-60 ">
                    <div className="flex items-center justify-between p-4">
                        <h3 className="text-xl strokeWidth text-gray-900"></h3>
                        <button className="text-white bg-transparent  hover:text-gray-900 rounded-md text-sm h-8 w-8 ms-auto inline-flex justify-center items-center " onClick={onClose}>
                            <IoMdClose size={40} />
                        </button>
                    </div>
                    <div className="p-4">
                        <h1 className="text-center">BOX N° {id}</h1>
                        <form className="text-black text-xs uppercase" onSubmit={handleSubmit(onSubmit)}>
                            <ScrollContainer maxHeight="400px">
                                <div className="mb-4">
                                    <label className="text-white" htmlFor="">Ingresar Objeto</label>
                                    <select
                                        id="prenda"
                                        name="prenda"
                                        /*  value={formData.prenda}
                                         onChange={handleChange} */
                                        className="my-1 p-2 w-full border rounded-md text-black"
                                    >
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
                                </div>
                                <IoMdAddCircle
                                    /* onClick={closeMoreInputs} */
                                    className="text-zinc-200 cursor-pointer hover:text-green-500"
                                    size={32}
                                />
                                
                                <div className="mb-4">
                                  {/*   <label className="block  font-medium text-white">Celular</label> */}
                                    <input
                                        {...register('prenda')}
                                        type="text"
                                        autoComplete='off'
                                        name="prenda"
                                        id='prenda'
                                        defaultValue={''}
                                        className="w-full px-4 py-2 border border-gray-300  rounded-md"
                                    />
                                </div>
                            </ScrollContainer>
                            <div className="  mt-4 flex justify-center">
                                <button type="submit" className="bg-colorBlue rounded-md mx-2 px-8 py-3 w-full text-center  shadow-xl  flex justify-center items-center text-white" >Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}   
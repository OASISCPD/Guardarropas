import React, { useEffect, useState } from "react";
import { BsBox } from "react-icons/bs";
import { IoMdTrash } from "react-icons/io";
//modal
import ModalBox from "../modals/ModalBox";
//contexs
import { useBoxContext } from "../../context/ContextBox";
import Loading from "../loadings/LoadingTemplates";
import Modal from "../modals/Modal";
import swal from "sweetalert";

function TemplateBoxes() {
  const [boxs, setBoxs] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para indicar si la carga está en progreso
  const { boxData, clearBoxData } = useBoxContext();
  const isBoxDataEmpty = Object.keys(boxData).length === 0;

  //Modal Libre
  const [selectedBoxId, setSelectedBoxId] = useState(null);

  //Modal Olvidado
  const [selectForgotten, setSelectForgotten] = useState(null)

  //Buttons Modal Libre
  const openModal = (id) => {
    setSelectedBoxId(id);
  };

  const closeModal = () => {
    setSelectedBoxId(null);
  };

  //Buttons Modal Olvidado
  const openModalForgotten = async () => {
    //setSelectForgotten(id);
    swal("Box no habilitado", "Si quieres utilizarlo pase el registro asociado a objetos olvidados", "error")
  }
  const openModalBusy = async () => [
    swal("Box ocupado", "Si quieres utilizarlo retire el registro asociado", "error")
  ]

  const closeModalForgotten = () => {
    setSelectForgotten(null)
  }

  var requestOptions = {
    method: "GET",
    credentials: "include",
    redirect: "follow",
  };

  const handleClearData = async (index) => {
    await clearBoxData(index);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizar la solicitud Fetch
        const response = await fetch(
          "http://127.0.0.1:5000/traer_lugares?tipo=box",
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Error al obtener lugares");
        }
        // Convertir la respuesta a JSON
        const data = await response.json();

        // Actualizar el estado con los datos recibidos
        setBoxs(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        // La carga ha terminado, independientemente de si fue exitosa o no.
        setLoading(false);
      }
    };
    fetchData();
  }, [boxData]);


  return (
    <>
      {loading ? ( // Mostrar indicador de carga si la carga está en progreso
        <Loading />
      ) : (
        <div className="w-1/3 mx-1">
          <div className="px-4 bg-colorGray rounded-xl py-4 shadow-2xl">
            <div className="flex items-center justify-center ">
              <h1 className="text-colorOrange">
                <BsBox size={30} />
              </h1>
              <h1 className="text-center my-4 text-3xl  text-white mx-4">
                B O X E S
              </h1>
            </div>
            <div className="grid grid-cols-12">
              {boxs.map((box) => (
                <button
                  key={box.id_lugar}
                  onClick={() => {
                    if (box.estado === "LIBRE") {
                      openModal(box.id_lugar);
                    }
                    else if (box.estado === "OLVIDADO") {
                      openModalForgotten(box.id_lugar)
                    }
                    else if (box.estado === "OCUPADO") {
                      openModalBusy(box.id_lugar)
                    }
                  }}
                  className={`${box.estado === "LIBRE"
                    ? "bg-colorGreen  hover:bg-green-600 duration-300"
                    : ""
                    } ${box.estado === "OCUPADO"
                      ? "bg-colorRed  hover:bg-red-600 duration-300"
                      : ""
                    } ${box.estado === "OLVIDADO"
                      ? "bg-yellow-500  hover:bg-yellow-600 duration-300"
                      : ""
                    } py-2 rounded-md text-sm mx-1 text-white p-0 text-center mb-4  cursor-pointer `}
                >
                  {box.numero}
                </button>
              ))}
            </div>
          </div>
          {isBoxDataEmpty ? (
            <></>
          ) : (
            <>
              {Array.isArray(boxData) && boxData.length > 0 && (
                // Mostrar información de uno o varios elementos
                <>
                  {boxData.length === 1 ? (
                    // Mostrar información de un solo elemento
                    <div className="flex border-b border-zinc-400 border-opacity-75 justify-between my-4 mx-2  text-zinc-200">
                      <div className="flex">
                        <h1 className="text-lg ml-8">
                          BOX: {boxData[0].id_lugar} :{" "}
                        </h1>
                        <h1 className="text-lg mx-4"> {boxData[0].prenda} </h1>
                      </div>
                      <button
                        onClick={() => handleClearData(0)}
                        className="hover:text-red-500 duration-300"
                      >
                        <IoMdTrash size={26} />
                      </button>
                    </div>
                  ) : (
                    // Mostrar información de varios elementos
                    <>
                      {boxData.map((box, index) => (
                        <div
                          key={box.id_lugar}
                          className="flex border-b border-zinc-400 border-opacity-75 justify-between my-4 mx-2  text-zinc-200"
                        >
                          <div className="flex">
                            <h1 className="text-lg ml-8">
                              BOX: {box.id_lugar} :{" "}
                            </h1>
                            <h1 className="text-lg mx-4"> {box.prenda} </h1>
                          </div>
                          <button
                            onClick={() => handleClearData(index)}
                            className="hover:text-red-500 duration-300"
                          >
                            <IoMdTrash size={26} />
                          </button>
                        </div>
                      ))}
                    </>
                  )}
                </>
              )}
            </>
          )}
          <div className="relative z-50">

            {selectedBoxId && (
              <Modal isOpen={true} onClose={closeModal} >
                <ModalBox
                  onClose={closeModal}
                  id_lugar={selectedBoxId}
                  boxNum={boxs.find((box) => box.id_lugar === selectedBoxId)?.numero}
                />
              </Modal>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default TemplateBoxes;

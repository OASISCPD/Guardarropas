import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../../logic/api";
import { toast } from "react-toastify";

function ButtonSingOut() {
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            const response = await fetch(`${BaseUrl}/logout`, {
                method: "GET", // Puedes ajustar el método según tu implementación en el servidor
                credentials: "include", // Asegúrate de incluir las cookies
                redirect: "follow",
            });
            if (!response.ok) {
                /* console.log(await response.text()) */
                alert('Error al intentar cerrar sesión.')
                throw new Error("Error al intentar cerrar sesión.");
                /*   swal("ERROR  AL REALIZAR EL LOGOUT", error.message, "error") */
            }
            //alerta de testeo
            const data = await response.json()
            /* alert(data.message) */
            toast.success(`${data.message}`)
            // Limpiar las cookies u otros datos de sesión
            localStorage.removeItem("cookies");

            // Redirige al usuario a la página de inicio de sesión ("/")
            navigate("/");
        } catch (error) {
            console.error("Error al intentar cerrar sesión:", error);
            toast.error(`Error al intentar cerrar sesión: ${error}`)
        }
    };
    return (
        <button onClick={handleLogout} className="bg-colorRed w-full py-2 rounded-md mx-auto text-white shadow-xl hover:scale-105 duration-150">
            Salir
        </button>
    );
}
export default ButtonSingOut;

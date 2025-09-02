import { toast } from "react-toastify"
import { BaseUrl } from "../../logic/api"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoaderRegisterHoverMobile } from "../loaders/LoaderRegister";

export function ButtonLogout() {
    //loading
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate();
    //funcion deslogueo
    async function logoutSession() {
        setLoading(true)
        /* await Logout(navigate); */
        try {
            const response = await fetch(`${BaseUrl}/logout`, { credentials: 'include' as RequestCredentials })
            if (!response.ok) {
                throw new Error("Error al intentar cerrar sesión.");
            }
            //limpiamos las cookies y datos de la session
            localStorage.removeItem('cookies')
            setLoading(false)
            //regirigir el usuario a la pagina de inicio de sesion
            navigate('/')
        } catch (error) {
            console.error(error)
            toast.error("Error al intentar cerrar sesión, intente nuevamente")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full  p-4">
            {loading && (
                <LoaderRegisterHoverMobile />
            )}
            <button
                onClick={logoutSession}
                className="bg-gradient-to-r from-colorOrange to-orange-600 hover:from-orange-600 hover:to-orange-700 hover:scale-105 duration-100 px-4 py-3 2xl:py-2.5 w-full rounded-md text-xs sm:text-sm shadow-xl"
            >
                Salir
            </button>
        </div>
    )
}
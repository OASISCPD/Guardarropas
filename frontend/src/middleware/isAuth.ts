import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../logic/api";
import { IsAuthDTO } from "../types/IsAuthDto";

export function IsAuth({ children, route }: IsAuthDTO) {
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch(`${BaseUrl}/check_session`, {
                    credentials: "include" as RequestCredentials,
                });
                if (response.status === 401) {
                    console.log("Error de estado");
                    // Redireccionar a la página de inicio de sesión si no hay sesión
                    navigate("/");
                } else if (response.status == 200) {
                    navigate(route);
                } else {
                    navigate(route);
                }
            } catch (error) {
                console.error("Error al verificar la sesión:", error);
            }
        };
        checkSession();
    }, [navigate]);

    return children;
};

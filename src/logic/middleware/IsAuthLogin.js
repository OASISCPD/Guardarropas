import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IsAuthLogin = ({ children, route }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("http://127.0.0.1:2000/check_session", {
          credentials: "include",
        });
        if (response.status === 200) {
          //   console.log("Redireccionando para el HOME")
          // Redireccionar a la página de inicio de sesión si no hay sesión
          navigate("/home");
        } else {
          //  console.log('No authorizado, redireccionando a LOGIN')

          navigate("/");
        }
      } catch (error) {
        console.error("Error al verificar la sesión:", error);
      }
    };
    checkSession();
  }, [navigate]);

  return children;
};

export default IsAuthLogin;

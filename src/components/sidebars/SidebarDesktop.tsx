import React, { useEffect, useState } from "react";
import { GiHanger } from "react-icons/gi";
import { LuBrain } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";
import { RiErrorWarningLine, RiFileHistoryLine } from "react-icons/ri";
import { FaRegQuestionCircle } from "react-icons/fa";
/* import logo from "../img/LogoSideBar.png"; */
/* import ButtonSingOut from "../buttons/ButtonSingOut"; */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BaseUrl } from "../../logic/api";
import { UserDTO } from "../../logic/dtos/UserDto";
type Route = string; //tipo para las rutas, que pueden ser simples cadenas

export function SidebarDesktop() {
    const [currentRoute, setCurrentRoute] = useState("");
    const [user, setUser] = useState<UserDTO>();
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavLinkClick = (route: Route): void => {
        // Verifica si la ruta está deshabilitada
        if (["/"].includes(route)) {
            // Muestra un alerta y no realiza la redirección
            alert("Módulo no habilitado… redireccionando al HOME");
            navigate("/home");
        } else {
            setCurrentRoute(route);
            navigate(route);
        }
    };

    useEffect(() => {

        const fetchDataUser = async () => {
            try {
                const res = await fetch(`${BaseUrl}/user`, {
                    credentials: "include" as RequestCredentials,
                    redirect: "follow" as RequestRedirect,
                    mode: "cors" as RequestMode,
                });
                const data = await res.json();
                console.log(data)
                await setUser(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDataUser();
    }, [location]);

    const routes = [
        {
            path: "/home",
            icon: <GiHanger className="text-colorOrange" size={20} />,
            label: "Home",
        },
        {
            path: "/historial",
            icon: <RiFileHistoryLine className="text-colorOrange" size={20} />,
            label: "Historial",
        },
        {
            path: "/amb_clientes",
            icon: <FaRegUser className="text-colorOrange" size={20} />,
            label: "ABM Clientes",
        },
        {
            path: "/objetos_perdidos",
            icon: <FaRegQuestionCircle className="text-colorOrange" size={20} />,
            label: "Obj. Perdidos",
        },
        {
            path: "/objetos_olvidados",
            icon: <LuBrain className="text-colorOrange" size={20} />,
            label: "Obj. Olvidados",
        },
        {
            path: "/novedades",
            icon: <RiErrorWarningLine className="text-colorOrange" size={20} />,
            label: "Novedades",
        },
    ];

    return (
        <>
            <button
                data-drawer-target="default-sidebar"
                data-drawer-toggle="default-sidebar"
                aria-controls="default-sidebar"
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-md sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            >
                <span className="sr-only">Open sidebar</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                </svg>
            </button>

            <aside
                id="default-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full px-8 py-4 mx-auto overflow-y-auto bg-colorGray ">
                    <ul className="">
                        <li className="my-4">
                            <div>
                              {/*   <img
                                    src={logo}
                                    alt="Imagen del logo"
                                    className="w-full h-full object-contain"
                                /> */}
                            </div>
                            <hr className="border-t-1 border-gray-400" />
                        </li>
                        {routes.map((route, index) => (
                            <li key={index} className="border-b-2 border-b-gray-400">
                                <Link
                                    to={route.path}
                                    className={`flex items-center p-2 text-white rounded-sm  hover:bg-black duration-100  group ${currentRoute === route.path ? "bg-gray-200" : ""
                                        }`}
                                    onClick={() => handleNavLinkClick(route.path)}
                                >
                                    {route.icon}
                                    <span className="flex-1 ms-3 whitespace-nowrap">
                                        {route.label}
                                    </span>
                                    {/* Agregar el badge si lo necesitas */}
                                    {/*   {route.badge && (
                                        <span
                                            className={`inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm  text-${route.badgeColor || "green-600"
                                                } bg-zinc-100 rounded-full `}
                                        >
                                            {route.badge}
                                        </span>
                                    )} */}
                                </Link>
                            </li>
                        ))}
                        {user && (
                            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 bg-colorGrayWhite  text-white text-sm mx-auto  items-center text-center justify-center shadow-sm rounded-md flex flex-col">
                                <div className="py-2 px-4 text-xs">
                                    <p>{user.nombre}</p>
                                    <p>Legajo: {user.legajo}</p>
                                </div>
                            </div>
                        )}

                        <div className="absolute w-full  bottom-6 justify-center left-0 mx-auto px-4 ">
                            {/* <ButtonSingOut /> */}SALIR
                        </div>
                    </ul>
                </div>
            </aside>
        </>
    );
}


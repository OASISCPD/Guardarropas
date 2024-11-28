import { useEffect, useState } from "react";
/* import imgTitle from "../imgs/titleSideBarDesktop.png" */
//importando imagenes
const image = `/images/${domain.toLowerCase()}/logoSideBar.png`
import { useNavigate } from "react-router-dom";
import { RiCoupon2Line, RiExchangeLine } from "react-icons/ri";
import { MdOutlineHistoryEdu, MdOutlineReorder } from "react-icons/md";
import { BsClipboardData } from "react-icons/bs";
import { FaRegCircleDot, FaRegHeart } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useSidebar } from "../../context/SideBarContex";
import { getUserSession, getUserSessionDTO } from "../../logic/user";
import { ScrollContainer } from "../logic/ScrollContainer";
import { domain } from "../../config/domain";

interface NavItemProps {
    title: string;
    icon: React.ReactNode;
    route: string
}

const menuOwner = [
    {
        title: "Home",
        icon: <FaRegCircleDot />,
        route: "/home",
    },
    {
        title: "Historial",
        icon: <RiCoupon2Line />,
        route: "/historial",
    },
    {
        title: "ABM Clientes",
        icon: <RiExchangeLine />,
        route: "/amb_clientes",
    },
    {
        title: "Obj. Perdidos",
        icon: <FaRegHeart />,
        route: "/objetos_perdidos",
    },
    {
        title: "Obj. Olvidados",
        icon: <RiExchangeLine />,
        route: "/objetos_olvidados",
    },
    {
        title: "Novedades",
        icon: <BsClipboardData />,
        route: "/novedades",
    },
];

const NavItem: React.FC<NavItemProps> = ({ title, icon, route }) => {
    const navigate = useNavigate();
    //seleccion del links y ver cual esta seleccionado
    const { selectedLink, setSelectedLink } = useSidebar();

    return (
        <li>
            <div
                className={`flex items-center p-2 space-y-1 hover:bg-sideBarBackgroundRed ${selectedLink === route ? "bg-onClickBGSideBar bg-opacity-45" : ""} cursor-pointer`}
                onClick={() => { navigate(route), setSelectedLink(route) }} // Cambia esta línea si usas otra solución de enrutamiento
            >
                <div className={` mr-2 ${selectedLink === route ? "text-colorOragen" : "text-colorOragen"}`}>
                    {icon} {/* Aquí aplica el color condicional */}
                </div>
                <span className="ml-2 text-sm sm:text-xl lg:text-xs xl:text-sm 2xl:text-base">{title}</span>
            </div>
            <hr className="mx-2  border-white" />
        </li>
    );
};

interface propSideBar {
    onClose: () => void
}
export function NavMenu({ onClose }: propSideBar) {
    const [maxHeight, setMaxHeight] = useState('800px');
    const navigate = useNavigate();
    //variable que guarda el rol del usuario para pasar como condicional
    const [user, setUser] = useState<getUserSessionDTO>({ nombre: 'BECCI ALEX MAXIMILANO BECCI ', legajo: 12324 });
    //function que obtiene la data del usuario en el momento
    async function getData() {
        try {
            const res = await getUserSession();
            if (res) {
                setUser(res)
            }
        } catch (error) {
            console.error(error)
        }
    }
    //funcion deslogueo
    async function logoutSession() {
        /* await Logout(navigate); */
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        const mediaQuery = window.matchMedia("(orientation: portrait)");
        const handleOrientationChange = (mediaQueryList: MediaQueryListEvent | MediaQueryList) => {
            setMaxHeight(mediaQueryList.matches ? '350px' : '400px');
        };
        // Ejecutar la primera vez para establecer la altura inicial
        handleOrientationChange(mediaQuery);

        // Escuchar cambios en la orientación
        const listener = (event: MediaQueryListEvent) => {
            handleOrientationChange(event);
        };
        mediaQuery.addEventListener('change', listener);
        // Limpieza al desmontar el componente
        return () => {
            mediaQuery.removeEventListener('change', listener);
        };
    }, []);

    return (
        < aside className={`fixed top-0 right-0 transition-all duration-500 h-2/3 w-full text-xs  bg-colorGray z-50 shadow-2xl transform  textGothamMedium  flex flex-col  text-white `}
        >
            <div className='flex justify-end textGothamMedium border-b border-gray-500 mb-2'>
                <h1 className="p-4 sm:p-4" onClick={onClose}><MdOutlineReorder size={40} />
                </h1>
            </div>

            <div className="flex justify-center items-center w-full h-auto sm:h-full">
                <img
                    src={image}
                    alt="Imagen Sidebar"
                    className="w-[60%] sm:w-full h-auto object-contain sm:object-cover"
                />
            </div>
            <ScrollContainer maxHeight="400px">
                <nav className="flex-1 p-2  ">
                    <ul className="">
                        {
                            menuOwner.map((item, index) => (
                                <NavItem
                                    key={index}
                                    title={item.title}
                                    icon={item.icon}
                                    route={item.route}
                                />
                            ))
                        }
                    </ul>
                </nav>
            </ScrollContainer>
            <div className="w-full  p-4 text-xs">
                <div className="p-4 flex gap-2 items-center text-center bg-colorCardUser bg-opacity-20 rounded-md shadow-md text-colorGrayLight">
                    <h1>{user.nombre}</h1>
                    <h1>LEGAJO: {user.legajo}</h1>
                </div>
            </div>
            <div className="w-full  p-4">
                <button
                    onClick={logoutSession}
                    className="bg-colorRed hover:scale-105 duration-100 px-4 py-3 2xl:py-2.5 w-full rounded-md text-xs sm:text-lg lg:text-xs xl:text-sm shadow-xl"
                >
                    Salir
                </button>
            </div>
        </aside >
    )
}
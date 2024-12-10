import { useEffect, useState } from "react";
/* import imgTitle from "../imgs/titleSideBarDesktop.png" */
//importando imagenes
const image = `/images/${domain.toLowerCase()}/logoSideBar.png`
import { useNavigate } from "react-router-dom";
import { RiCoupon2Line, RiExchangeLine } from "react-icons/ri";
import { MdOutlineReorder } from "react-icons/md";
import { BsClipboardData } from "react-icons/bs";
import { FaRegCircleDot, FaRegHeart } from "react-icons/fa6";
import { useSidebar } from "../context/SideBarContex";
import { getUserSession, getUserSessionDTO } from "../logic/user";
import { ScrollContainer } from "./logic/ScrollContainer";
import { domain } from "../config/domain";
import { ButtonLogout } from "./buttons/ButtonLogout";

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
        route: "/abm_clientes",
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
                <div className={` mr-2 ${selectedLink === route ? "text-colorOrange" : "text-colorOrange"}`}>
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
    /* const navigate = useNavigate(); */
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

    useEffect(() => {
        getData()
    }, [])

    return (
        < aside className={`fixed top-0 right-0 transition-all duration-500 h-2/3 w-full text-xs  bg-colorGray z-50 shadow-2xl transform  textGothamMedium  flex flex-col  text-white `}
        >
            <div className='flex justify-end textGothamMedium border-b border-gray-500 mb-2'>
                <h1 className="p-4 sm:p-4" onClick={onClose}><MdOutlineReorder size={40} />
                </h1>
            </div>

            <div className="flex justify-center items-center w-full h-auto">
                <img
                    src={image}
                    alt="Imagen Sidebar"
                    className="w-[60%] sm:w-[40%] h-auto object-contain sm:object-cover"
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
                <div className="p-4 flex gap-2 items-center text-center bg-colorCardUser/20 rounded-md shadow-md text-colorGrayLight">
                    <h1>{user.nombre}</h1>
                    <h1>LEGAJO: {user.legajo}</h1>
                </div>
            </div>
            <ButtonLogout />
        </aside >
    )
}
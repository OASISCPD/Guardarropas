// src/components/Sidebar.tsx
import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
// Importando los iconos desde react-icons
import { GiHanger } from "react-icons/gi";
import { RiFileHistoryLine, RiErrorWarningLine } from "react-icons/ri";
import { FaRegUser, FaRegQuestionCircle } from "react-icons/fa";
import { LuBrain } from "react-icons/lu";
import { Link/* , useNavigate */ } from 'react-router-dom';

interface NavItemProps {
    title: string;
    icon: React.ReactNode;
    children?: React.ReactNode;
    route: string
}

const NavItem: React.FC<NavItemProps> = ({ title, icon, children, route }) => {
    /*  const [isOpen, setIsOpen] = useState(false); */
    /* const navigate = useNavigate() */
    return (
        <li className="relative">
            <Link to={route}
                className="flex items-center justify-between p-2 hover:bg-gray-700 cursor-pointer"
            /* onClick={() => navigate({ route })} */
            >
                <div className="flex items-center">
                    {icon}
                    <span className="ml-2">{title}</span>
                </div>
                <FaChevronDown className={`transition-transform duration-300 `} />{/* ${isOpen ? 'rotate-180' : ''} */}
            </Link>
            {/*   <ul className={`ml-4 transition-max-height duration-300 overflow-hidden `}>
            </ul> */}
        </li>
    );
};



interface LinksDTO {
    icon: JSX.Element; // El tipo JSX.Element es adecuado para componentes JSX
    title: string
    path: string
}

const links: LinksDTO[] = [
    {
        path: "/home",
        icon: <GiHanger />,
        title: "Home",
    },
    {
        path: "/historial",
        icon: <RiFileHistoryLine />,
        title: "Historial",
    },
    {
        path: "/amb_clientes",
        icon: <FaRegUser />,
        title: "ABM Clientes",
    },
    {
        path: "/objetos_perdidos",
        icon: <FaRegQuestionCircle />,
        title: "Obj. Perdidos",
    },
    {
        path: "/objetos_olvidados",
        icon: <LuBrain />,
        title: "Obj. Olvidados",
    },
    {
        path: "/novedades",
        icon: <RiErrorWarningLine />,
        title: "Novedades",
    },
]

//constante que almacena los links en la app
export const Sidebar: React.FC = () => {
    return (
        <div className="flex relative">
            <aside className="w-64 bg-white shadow-lg fixed  h-screen flex flex-col">{/* fixed */}
                <div className="p-4 border-b">
                    <h1 className="text-xl font-bold text-teal-600">Dashboard</h1>
                </div>
                <nav className="p-4">
                    <ul>
                        {links.map((link) => (
                            <NavItem route={link.path} title={link.title} icon={link.icon}>

                            </NavItem>
                        ))}
                    </ul>
                </nav>
                <button className="p-4  absolute bottom-4 left-0 w-full ">
                    <h1 className="text-xl  text-center font-bold text-teal-600">Cerrar Sesion</h1>
                </button>
            </aside>
        </div >
    );
};


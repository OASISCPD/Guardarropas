// src/components/Sidebar.tsx
import React from 'react';
// Importando los iconos desde react-icons
import { GiHanger } from "react-icons/gi";
import { RiFileHistoryLine, RiErrorWarningLine } from "react-icons/ri";
import { FaRegUser, FaRegQuestionCircle } from "react-icons/fa";
import { LuBrain, LuFileSpreadsheet } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import ButtonSingOut from '../buttons/ButtonSingOut';
import { CardUserSidebar } from '../cards/CardUserSidebar';
import { domain } from '../../config/domain';
import { useSidebar } from '../../context/SideBarContex';
const image = `/images/${domain.toLowerCase()}/logoSideBar.png`
interface NavItemProps {
    title: string;
    icon: React.ReactNode;
    children?: React.ReactNode;
    route: string
}

const NavItem: React.FC<NavItemProps> = ({ title, icon, route }) => {
    const navigate = useNavigate();
    const { selectedLink, setSelectedLink } = useSidebar();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setSelectedLink(route);
        navigate(route);
    };

    const isSelected = selectedLink === route;

    return (
        <li className="relative">
            <Link
                to={route}
                onClick={handleClick}
                className={`flex items-center w-full p-3 rounded-md transition-all duration-200 cursor-pointer group ${isSelected
                    ? 'bg-colorOrange/20 border-l-4 border-colorOrange shadow-lg'
                    : 'hover:bg-black/40 active:bg-black/60'
                    }`}
            >
                <div className="flex items-center w-full">
                    <span className={`text-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-200 ${isSelected ? 'text-colorOrange' : 'text-colorOrange'
                        }`}>
                        {icon}
                    </span>
                    <span className={`ml-3 text-sm font-medium truncate transition-colors duration-200 ${isSelected
                        ? 'text-white font-semibold'
                        : 'text-white group-hover:text-gray-100'
                        }`}>
                        {title}
                    </span>
                </div>
                {isSelected && (
                    <div className="absolute right-2 w-2 h-2 bg-colorOrange rounded-full animate-pulse"></div>
                )}
            </Link>
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
        path: "/abm_clientes",
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
        title: "Instructivo",
        icon: <LuFileSpreadsheet />,
        path: "/instructivo",
    },
    {
        path: "/novedades",
        icon: <RiErrorWarningLine />,
        title: "Novedades",
    },
]

//constante que almacena los links en la app
export const Sidebar: React.FC = () => {
    const { setSelectedLink } = useSidebar();

    // Inicializar el link seleccionado basado en la URL actual
    React.useEffect(() => {
        const currentPath = window.location.pathname;
        const matchingLink = links.find(link => link.path === currentPath);
        if (matchingLink) {
            setSelectedLink(matchingLink.path);
        }
    }, [setSelectedLink]);

    return (
        <aside className="w-64 bg-colorBlueComponents shadow-lg z-50 h-screen flex flex-col sticky top-0">
            {/* Header con logo - altura fija */}
            <div className="flex-shrink-0 border-b border-gray-600 p-2">
                <img className='w-full h-auto max-h-16 object-contain' src={image} alt="IMAGEN SIDEBAR" />
            </div>

            {/* Navegación - crece y tiene scroll */}
            <nav className="flex-1 overflow-y-auto min-h-0 px-4 py-2">
                <ul className="space-y-1">
                    {links.map((link, index) => (
                        <NavItem
                            key={`${link.path}-${index}`}
                            route={link.path}
                            title={link.title}
                            icon={link.icon}
                        />
                    ))}
                </ul>
            </nav>

            <CardUserSidebar />

            {/* Botón de salir - altura fija en la parte inferior */}
            <div className="flex-shrink-0 p-4 border-t border-gray-600">
                <ButtonSingOut />
            </div>
        </aside>
    );
};


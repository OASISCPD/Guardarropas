// src/components/Sidebar.tsx
import React from 'react';
// Importando los iconos desde react-icons
import { GiHanger } from "react-icons/gi";
import { RiFileHistoryLine, RiErrorWarningLine } from "react-icons/ri";
import { FaRegUser, FaRegQuestionCircle } from "react-icons/fa";
import { LuBrain } from "react-icons/lu";
import { Link/* , useNavigate */ } from 'react-router-dom';
import ButtonSingOut from '../buttons/ButtonSingOut';
import { CardUserSidebar } from '../cards/CardUserSidebar';
import { domain } from '../../config/domain';
import { ScrollContainer } from '../logic/ScrollContainer';
const image = `/images/${domain.toLowerCase()}/logoSideBar.png`

interface NavItemProps {
    title: string;
    icon: React.ReactNode;
    children?: React.ReactNode;
    route: string
}

const NavItem: React.FC<NavItemProps> = ({ title, icon, route }) => {
    /*  const [isOpen, setIsOpen] = useState(false); */
    /* const navigate = useNavigate() */
    return (
        <li className="relative  border-b">
            <Link to={route}
                className="flex items-center justify-between p-2 hover:bg-black cursor-pointer"
            /* onClick={() => navigate({ route })} */
            >
                <div className="flex text-colorOrange items-center">
                    {icon}
                    <span className="ml-2 text-white">{title}</span>
                </div>
                {/*    <FaChevronDown className={`transition-transform duration-300 `} /> */}{/* ${isOpen ? 'rotate-180' : ''} */}
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
        path: "/novedades",
        icon: <RiErrorWarningLine />,
        title: "Novedades",
    },
]

//constante que almacena los links en la app
export const Sidebar: React.FC = () => {
    return (
        <aside className="w-64 bg-colorGray shadow-lg z-50 h-full flex flex-col fixed">{/* fixed */}

            <div className=" border-b">
                <img className='w-full h-full object-contain' src={image} alt="IMAGEN SIDEBAR" />
            </div>
            <nav className="p-4">
                <ScrollContainer maxHeight='400px'>
                    <ul>
                        {links.map((link) => (
                            <NavItem route={link.path} title={link.title} icon={link.icon}>

                            </NavItem>
                        ))}
                    </ul>
                </ScrollContainer>
            </nav>
            {/* AGREGAMOS LA CARD DEL USUARIO EN CUESTION */}
            <CardUserSidebar />
            <div className="p-4  absolute bottom-4 left-0 w-full ">
                <ButtonSingOut />
            </div>
        </aside>
    );
};


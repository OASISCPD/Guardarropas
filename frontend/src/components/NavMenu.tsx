import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { RiCoupon2Line, RiExchangeLine } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { BsClipboardData } from "react-icons/bs";
import { FaRegCircleDot, FaRegHeart, FaUser, FaIdCard } from "react-icons/fa6";
import { LuFileSpreadsheet } from "react-icons/lu";
import { useSidebar } from "../context/SideBarContex";
import { getUserSession, getUserSessionDTO } from "../logic/user";
import { domain } from "../config/domain";
import { ButtonLogout } from "./buttons/ButtonLogout";
import { FaRegQuestionCircle } from "react-icons/fa";

const image = `/images/${domain.toLowerCase()}/logoSideBar.png`;

interface NavItemProps {
    title: string;
    icon: React.ReactNode;
    route: string;
    onItemClick: () => void;
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
        icon: <FaRegQuestionCircle />,
        route: "/objetos_perdidos",
    },
    {
        title: "Obj. Olvidados",
        icon: <RiExchangeLine />,
        route: "/objetos_olvidados",
    },
    {
        title: "Instructivo",
        icon: <LuFileSpreadsheet />,
        route: "/instructivo",
    },
    {
        title: "Novedades",
        icon: <BsClipboardData />,
        route: "/novedades",
    },
];

const NavItem: React.FC<NavItemProps> = ({ title, icon, route, onItemClick }) => {
    const navigate = useNavigate();
    const { selectedLink, setSelectedLink } = useSidebar();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setSelectedLink(route);
        navigate(route);
        onItemClick(); // Cerrar el menú al hacer click
    };

    const isSelected = selectedLink === route;

    return (
        <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <div
                className={`flex items-center p-4 rounded-lg mx-2 mb-2 cursor-pointer transition-all duration-300 ${isSelected
                    ? "bg-colorOrange/20 border-l-4 border-colorOrange shadow-lg"
                    : "hover:bg-white/10 hover:shadow-md"
                    }`}
                onClick={handleClick}
            >
                <motion.div
                    className={`mr-3 text-xl ${isSelected ? "text-colorOrange" : "text-colorOrange"}`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.3 }}
                >
                    {icon}
                </motion.div>
                <span className={`text-sm font-medium ${isSelected ? "text-white font-semibold" : "text-gray-200"}`}>
                    {title}
                </span>
                {isSelected && (
                    <motion.div
                        className="ml-auto w-2 h-2 bg-colorOrange rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                    />
                )}
            </div>
        </motion.li>
    );
};

interface propSideBar {
    onClose: () => void
}
export function NavMenu({ onClose }: propSideBar) {
    const { setSelectedLink } = useSidebar();
    const [user, setUser] = useState<getUserSessionDTO>({ nombre: 'BECCI ALEX MAXIMILANO BECCI ', legajo: 12324 });

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

        // Inicializar el link seleccionado basado en la URL actual
        const currentPath = window.location.pathname;
        const matchingLink = menuOwner.find(link => link.route === currentPath);
        if (matchingLink) {
            setSelectedLink(matchingLink.route);
        }
    }, [setSelectedLink])

    // Variantes de animación para el menú
    const menuVariants = {
        hidden: {
            x: "100%",
            opacity: 0,
        },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 30,
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        },
        exit: {
            x: "100%",
            opacity: 0,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 30
            }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    return (
        <motion.aside
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-gradient-to-b from-colorBlueComponents to-colorBlueComponents/90 z-50 shadow-2xl flex flex-col text-white backdrop-blur-sm overflow-hidden"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            {/* Header con botón de cierre */}
            <motion.div
                className='flex justify-between items-center border-b border-gray-500/50 p-4 flex-shrink-0'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                
                <motion.div
                    className="flex justify-center items-center p-4 flex-shrink-0"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                    <motion.img
                        src={image}
                        alt="Logo"
                        className="w-64 h-auto object-contain"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    />
                </motion.div>
                <motion.button
                    className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
                    onClick={onClose}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <MdClose size={24} />
                </motion.button>
            </motion.div>
            {/* Navegación - sin ScrollContainer para evitar problemas */}
            <motion.nav
                className="flex-1 px-2 py-2 overflow-y-auto overflow-x-hidden min-h-0"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.ul className="space-y-1">
                    {menuOwner.map((item, index) => (
                        <NavItem
                            key={index}
                            title={item.title}
                            icon={item.icon}
                            route={item.route}
                            onItemClick={onClose}
                        />
                    ))}
                </motion.ul>
            </motion.nav>

            {/* Card de usuario */}
            <motion.div
                className="p-4 flex-shrink-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <motion.div
                    title={`${user?.nombre}`}
                    className="bg-gradient-to-r from-colorBlueComponentsWhite/10 to-colorCardUser/20 backdrop-blur-sm border border-white/10 rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    {user ? (
                        <div className="flex items-center space-x-3">
                            {/* Avatar */}
                            <div className="w-10 h-10 bg-colorOrange/20 rounded-full flex items-center justify-center flex-shrink-0">
                                <FaUser className="text-colorOrange text-lg" />
                            </div>

                            {/* Info del usuario */}
                            <div className="flex-1 min-w-0">
                                <motion.h3
                                    className="text-white font-semibold text-xs leading-tight truncate"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    {user.nombre}
                                </motion.h3>
                                <motion.div
                                    className="flex items-center mt-1 text-colorOrange/80"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <FaIdCard className="text-xs mr-1 flex-shrink-0" />
                                    <span className="text-xs font-medium">
                                        Legajo: {user.legajo}
                                    </span>
                                </motion.div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                                <FaUser className="text-red-400 text-lg" />
                            </div>
                            <div className="flex-1">
                                <p className="text-red-400 text-sm font-medium">Error al cargar usuario</p>
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div>            {/* Botón de logout */}
            <motion.div
                className="p-4 border-t border-gray-500/50 flex-shrink-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <ButtonLogout />
            </motion.div>
        </motion.aside>
    )
}
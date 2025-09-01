import { useEffect, useState } from "react"
import { BaseUrl } from "../../logic/api";
import { UserDTO } from "../../types/UserDto";
import { FaUser, FaIdCard } from "react-icons/fa";

export function CardUserSidebar() {
    const [user, setUser] = useState<UserDTO>()
    const [loading, setLoading] = useState(true)

    async function fetchDataUser() {
        setLoading(true)
        try {
            const res = await fetch(`${BaseUrl}/user`, {
                credentials: "include" as RequestCredentials,
                redirect: "follow" as RequestRedirect,
                mode: "cors" as RequestMode,
            });
            if (!res.ok) {
                throw new Error("Failed to fetch user data");
            }
            const data = await res.json();
            setUser(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchDataUser()
    }, [])

    if (loading) {
        return (
            <div className="p-4 mx-2 mb-2">
                <div className="bg-gradient-to-r from-colorBlueComponentsWhite/10 to-colorCardUser/20 rounded-lg p-4 animate-pulse">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-400/30 rounded-full"></div>
                        <div className="flex-1">
                            <div className="h-3 bg-gray-400/30 rounded mb-2"></div>
                            <div className="h-2 bg-gray-400/20 rounded w-2/3"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="p-4 mx-2 mb-2">
            <div title={`${user?.nombre}`} className="bg-gradient-to-r from-colorBlueComponentsWhite/10 to-colorCardUser/20 backdrop-blur-sm border border-white/10 rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                {user ? (
                    <div className="flex items-center space-x-3">
                        {/* Avatar */}
                        <div className="w-10 h-10 bg-colorOrange/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <FaUser className="text-colorOrange text-lg" />
                        </div>

                        {/* Info del usuario */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold text-xs  leading-tight">
                                {user.nombre}
                            </h3>
                            <div className="flex items-center mt-1 text-colorOrange/80">
                                <FaIdCard className="text-xs mr-1 flex-shrink-0" />
                                <span className="text-xs font-medium">
                                    Legajo: {user.legajo}
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                            <FaUser className="text-red-400 text-lg" />
                        </div>
                        <div className="flex-1">
                            <p className="text-red-400 text-sm font-medium">Error al cargar usuario</p>
                            <button
                                onClick={fetchDataUser}
                                className="text-xs text-colorOrange hover:text-colorOrange/80 transition-colors mt-1"
                            >
                                Reintentar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
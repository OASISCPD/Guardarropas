import { useEffect, useState } from "react"
import { BaseUrl } from "../../logic/api";
import { UserDTO } from "../../types/UserDto";

export function CardUserSidebar() {
    const [user, setUser] = useState<UserDTO>()

    async function fetchDataUser() {

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
            await setUser(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchDataUser()
    }, [])

    return (
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 bg-colorGrayWhite  text-white text-sm mx-auto  items-center text-center justify-center shadow-sm rounded-md flex flex-col">
            {user ? (
                <div className="py-2 px-4 uppercase bg-colorCardUser/20 rounded-md text-xs">
                    <p>{user.nombre}</p>
                    <p>Legajo: {user.legajo}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
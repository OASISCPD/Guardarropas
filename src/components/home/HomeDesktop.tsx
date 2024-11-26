import { useState } from "react"
import { Sidebar } from "../sidebars/Sidebar"
import { Navbar } from "./Navbar"
export function Home() {
    //coonstante booleana que activa la card con los valores de usuario seleccionados
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-64 p-6 overflow-y-auto">
                <Navbar />
                {/* TEMPLATE QUE ALMACENA LOS LUGARES */}

            </main>
        </div>
    )
}
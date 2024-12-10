import { useState } from "react";
import { MdOutlineReorder } from "react-icons/md";
import { NavMenu } from "./NavMenu";

export function Navbar() {
    //show navbar
    const [nav, setNav] = useState<boolean>(false)

    return (
        < nav className="bg-colorGray px-4 py-3" >
            <MdOutlineReorder onClick={() => setNav(!nav)} className='ml-auto' size={40} />
            {nav && (
                <NavMenu onClose={() => setNav(false)} />
            )}
        </nav >
    )
}
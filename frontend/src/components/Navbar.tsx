import { useState } from "react";
import { MdOutlineReorder } from "react-icons/md";
import { NavMenu } from "./NavMenu";

export function Navbar() {
    //show navbar
    const [nav, setNav] = useState<boolean>(false)

    return (
        < nav className="bg-colorBlueComponents px-4 py-3" >
            <MdOutlineReorder onClick={() => setNav(!nav)} className='ml-auto text-xl' />
            {nav && (
                <NavMenu onClose={() => setNav(false)} />
            )}
        </nav >
    )
}
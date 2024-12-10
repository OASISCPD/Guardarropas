import { BiRefresh } from "react-icons/bi";

export function ReloadPageButton() {
    return (
        <div className="flex items-center  justify-center mb-2">
            <button onClick={() => window.location.reload()} className="ml-auto bg-cyan-800 rounded-full items-center"> <BiRefresh

                size={30}
                className=" cursor-pointer text-white hover:animate-spin transition-transform duration-75"
            /></button>
        </div>
    )
}
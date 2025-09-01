import { LuLoader2 } from "react-icons/lu";

export function LoaderRegisterMobile() {
    return (
        <div className="bg-slate-700 bg-opacity-50 rounded-md flex items-center justify-center min-h-[200px] animate-pulse">
            <LuLoader2 size={60} className="animate-spin text-colorOrange" />
        </div>
    )
}


export function LoaderRegisterHoverMobile() {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <LuLoader2 size={80} className="animate-spin text-colorOrange" />
        </div>
    )
}
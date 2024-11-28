import { LuLoader2 } from "react-icons/lu";

export function LoaderRegisterMobile() {
    return (
        <div className="bg-colorWhiteShadow bg-opacity-50 rounded-md flex items-center justify-center min-h-[200px] animate-pulse">
            <LuLoader2 size={60} className="animate-spin text-colorOragen" />
        </div>
    )
}
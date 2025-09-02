import { BiRefresh } from "react-icons/bi";
import { useState } from "react";

export function ReloadPageButton() {
    const [isReloading, setIsReloading] = useState(false);

    const handleReload = () => {
        setIsReloading(true);
        setTimeout(() => {
            window.location.reload();
        }, 800); // Small delay for better UX
    };

    return (
        <div className="flex items-center justify-end">
            <button
                onClick={handleReload}
                disabled={isReloading}
                className="group relative inline-flex items-center justify-center w-10 h-10 bg-slate-700 hover:bg-slate-600 
                          border border-slate-600 hover:border-slate-500 rounded-lg text-slate-300 hover:text-slate-100
                          transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-105 
                          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                title={isReloading ? 'Recargando...' : 'Recargar página'}
            >
                <BiRefresh
                    size={18}
                    className={`transition-transform duration-300 ${isReloading ? 'animate-spin text-colorOrange' : 'group-hover:rotate-180'
                        }`}
                />

                {/* Loading indicator */}
                {isReloading && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-colorOrange rounded-full animate-pulse border-2 border-slate-800"></div>
                )}
            </button>
        </div>
    );
}
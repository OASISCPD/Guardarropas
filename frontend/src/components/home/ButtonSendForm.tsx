interface propButton {
    send: () => void
    loading: boolean
}

export function ButtonSendForm({ send, loading }: propButton) {
    return (
        <div className="w-full mt-auto lg:w-1/3 xl:w-1/4 2xl:w-1/5 lg:ml-auto p-4">
            <button
                disabled={loading}
                onClick={send}
                className={`group relative w-full lg:mx-auto px-4 py-3 lg:py-2.5 rounded-md text-xs sm:text-sm font-medium shadow-xl transition-all duration-200 overflow-hidden
                    ${loading 
                        ? 'bg-slate-600 cursor-not-allowed opacity-70' 
                        : 'bg-colorRed hover:bg-red-700 hover:scale-105 active:scale-95'
                    }
                `}
            >
                {/* Background gradient effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${loading ? 'hidden' : ''}`}></div>
                
                {/* Loading spinner */}
                {loading && (
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                
                {/* Content */}
                <div className={`relative flex items-center justify-center gap-2 text-white ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}>
                    <svg 
                        className="w-4 h-4 flex-shrink-0" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                        />
                    </svg>
                    <span>Guardar e Imprimir Ticket</span>
                </div>

                {/* Loading text */}
                {loading && (
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-6">
                        <span className="text-xs text-white opacity-70">Procesando...</span>
                    </div>
                )}

                {/* Ripple effect on click */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 rounded-md opacity-0 group-active:opacity-30 bg-white transition-opacity duration-100"></div>
                </div>
            </button>
        </div>
    )
}
export function InfoColors() {
    return (
        <div className="flex justify-between gap-4 mt-4 lg:mt-0 text-sm">
            <div className="flex items-center gap-1">
                <div className="w-4 h-4 lg:w-6 lg:h-6 bg-colorGreen rounded-sm lg:rounded-sm"></div>
                <span>Libre</span>
            </div>
            <div className="flex items-center gap-1">
                <div className="w-4 h-4 lg:w-6 lg:h-6 bg-colorRed rounded-sm lg:rounded-sm"></div>
                <span>Ocupado</span>
            </div>
            <div className="flex items-center gap-1">
                <div className="w-4 h-4 lg:w-6 lg:h-6 bg-colorYellow rounded-sm lg:rounded-sm"></div>
                <span>Olvidado</span>
            </div>
        </div>
    )
}
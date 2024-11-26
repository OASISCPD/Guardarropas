export function InfoColors() {
    return (
        <div className="flex justify-between gap-4 mt-4 text-sm">
            <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-colorGreen rounded-sm"></div>
                <span>Libre</span>
            </div>
            <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-colorRed rounded-sm"></div>
                <span>Ocupado</span>
            </div>
            <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-colorYellow rounded-sm"></div>
                <span>Olvidado</span>
            </div>
        </div>
    )
}
interface propButton {
    send: () => void
}

export function ButtonSendForm({ send }: propButton) {
    return (
        <div className="w-full mt-auto lg:w-1/4 lg:ml-auto p-4">
            <button
                onClick={send}
                className="bg-colorRed hover:bg-red-700   duration-100 hover:scale-105  px-4 py-3 lg:py-2.5 w-full rounded-md text-xs sm:text-sm shadow-xl"
            >
                Guardar e imprimir ticket
            </button>
        </div>
    )
}
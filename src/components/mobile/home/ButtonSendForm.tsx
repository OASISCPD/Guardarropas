interface propButton {
    send: () => void
}

export function ButtonSendForm({ send }: propButton) {
    return (
        <div className="w-full mt-auto p-4">
            <button
                onClick={send}
                className="bg-colorRed  duration-100 px-4 py-3 2xl:py-2.5 w-full rounded-md text-xs sm:text-lg lg:text-xs xl:text-sm shadow-xl"
            >
                Guardar e imprimir ticket
            </button>
        </div>
    )
}
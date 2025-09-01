export function CardLoading() {
    return (
        <div className="p-4 my-2 bg-colorBlueComponents rounded-md shadow-sm animate-pulse">
            <div className="mb-2">
                <h1 className="flex items-center">
                    <span className="ml-2 bg-gray-500 rounded w-40 h-4"></span>
                </h1>
                <h1 className="flex items-center mt-2">
                    <span className="ml-2 bg-gray-500 rounded w-48 h-4"></span>
                </h1>
            </div>
            <h1 className="flex items-center text-colorMsjYellow">
                <span className="ml-2 bg-gray-500 rounded w-full h-4"></span>
            </h1>
        </div>
    )
}

export function ModalLoadingTemplate() {
    return (
        <div className="p-4 my-2 bg-colorBlueComponents rounded-md shadow-sm animate-pulse">
            <div className="mb-2">
                <h1 className="flex items-center my-4">
                    <span className="ml-2 bg-gray-500 rounded w-full h-4"></span>
                </h1>
                <h1 className="flex items-center my-2">
                    <span className="mx-auto bg-gray-500 rounded w-56 h-4"></span>
                </h1>
            </div>
            <h1 className="flex items-center my-4 text-colorMsjYellow">
                <span className="mx-auto bg-gray-500 rounded w-40 h-4"></span>
            </h1>
            <h1 className="flex items-center my-2">
                <span className="mx-auto bg-gray-500 rounded w-56 h-4"></span>
            </h1>
        </div>
    )
}
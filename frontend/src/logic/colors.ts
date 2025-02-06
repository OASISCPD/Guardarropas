export function getTextColorForState(estado: string): string {
    switch (estado) {
        case 'ACTIVO':
            return 'text-green-500';
        case 'EN DONACION':
            return 'text-colorYellow';
        case 'DONADO':
            return 'text-colorMsjYellow';
        default:
            return 'text-colorRed'; // color por defecto si no coincide con ningún estado
    }
}

export function getTextColorForStateForgotten(estado: string) {
    switch (estado) {
        case 'GUARDADO':
            return 'text-green-500';
        case 'OLVIDADO':
            return 'text-colorYellow';
        case 'DONADO':
            return 'text-orange-500';
        case "RETIRADO":
            return 'text-colorRed';
        default:
            return 'text-colorRed'
    }
}
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
        case 'OLVIDADO':
            return 'text-colorYellow';
        case 'DONADO':
            return 'text-colorOrange';
        case "RETIRADO":
            return 'text-colorRed';
        default:
            return 'text-colorRed'
    }
}
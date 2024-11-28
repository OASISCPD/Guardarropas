export function getPlacesClass(state: string): string {
    switch (state.toUpperCase()) {
        case 'LIBRE':
            return 'bg-colorGreen hover:bg-green-600';
        case 'OCUPADO':
            return 'bg-colorRed hover:bg-red-600';
        case 'OLVIDADO':
            return 'bg-colorYellow hover:bg-yellow-600';
        default:
            return '';
    }
}
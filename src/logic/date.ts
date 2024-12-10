//funcion que formatea un tipo de data en especifico
export function formatDate(dateString: string): string {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
}

//funcion que valida la fecha ingresada para saber si es mayode 18 anos
export function isAdult(fecha: string): boolean {
    //convertir la fecha de nacimineto  a un tipo Date
    const birthDate = new Date(fecha);
    const today = new Date();//fecha actual

    //calcular la diferencia de años
    let age = today.getFullYear() - birthDate.getFullYear();
    //ajustar la edad si el cumpleaños aun no ocurrio
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
    }
    return age >= 18//retornamos true si es mayor o igual a 18, false en caso de q sea menor de edad;
}
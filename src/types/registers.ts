export interface GetRegisterDTO {
    id_registro: number; // ID del registro
    datetime_ingreso: string; // Fecha y hora de ingreso
    datetime_egreso: string | null; // Fecha y hora de egreso (puede ser null)
    n_documento: string; // Número de documento
    apellido_nombre: string; // Apellido y nombre de la persona
    lugares_ocupados: string; // Lugar
}
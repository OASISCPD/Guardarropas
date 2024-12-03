export interface TypeModal {
    id: number
    state: boolean
    id_front?: number
}

//tipo de datos para el modal diferente mas orientado a objetos perdidos

export interface TypeModalObjectLost {
    id: number
    state: boolean
    stateObject: string
}
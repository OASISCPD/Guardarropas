import { ClientDataUpdateDTO, GetClientDTO } from "../types/client";
import { BaseUrl } from "./api";


//function  que  me retorna el body esperado por el backend para actualizar el client
export function formatClientDataUpdate(data: GetClientDTO): ClientDataUpdateDTO {
    return {
        id_cliente: data.id_cliente,
        n_documento: data.n_documento,
        tipo_documento: data.tipo_documento,
        nombre: data.nombre,
        apellido: data.apellido,
        celular: data.celular,
        fecha_nacimiento: data.date_nacimiento, // Si es necesario formatear la fecha
        genero: data.genero,
        provincia: data.provincia || "", // Si está vacío, asignar un valor por defecto
        localidad: data.localidad === "undefined" ? "" : data.localidad, // Verifica si es "undefined"
        direccion: data.direccion || "" // Si está vacío, asignar un valor por defecto
    }
}


export async function getClientsByDni(dni: number | string) {
    try {
        /* const response = await fetch(`${BaseUrl}/traer_cliente_x_dni?dni=${dni}`, { credentials: 'include' as RequestCredentials }) */
        const response = await fetch(`${BaseUrl}/traer_cliente_x_dni?dni=${dni}`, { credentials: 'include' as RequestCredentials })
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

//function que me trae los registros de los clientes agregados
export async function getClientRegister() {
    try {
        /* const response = await fetch(`${BaseUrl}/traer_cliente_x_dni?dni=${dni}`, { credentials: 'include' as RequestCredentials }) */
        const response = await fetch(`${BaseUrl}/traer_clientes`, { credentials: 'include' as RequestCredentials })
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

//function que elima el cliente por id 
export async function deleteClientById(id: number) {
    try {
        const response = await fetch(`${BaseUrl}/delete_cliente?id_cliente=${id}`, { credentials: 'include' as RequestCredentials })
        const data = await response.text();
        return data
    } catch (error) {
        console.error(error)
    }
}


//function que desgloza el campo de cadena de dni para separar los valores uno por uno para su validacion y demas
export function stringProccess(string: any) {
    try {
        string = string.replaceAll('"', "@");
        let codigo = string.split("@");
        if (codigo[2].length === 1) {
            let fecha = codigo[7]
                .replaceAll("-", "/")
                .split("/")
                .reverse()
                .join("-");
            /*   return (codigo[1], codigo[4], codigo[5], codigo[8], fecha); */
            // Retornamos un objeto con las variables
            return {
                dni: codigo[1],
                lastName: codigo[4],
                name: codigo[5],
                gender: codigo[8],
                date: fecha,
            };
        }
        else {
            if (codigo[1].length === 1) {
                let fecha = codigo[10]
                    .replaceAll("-", "/")
                    .split("/")
                    .reverse()
                    .join("-");

                /*  return (codigo[8], codigo[5], codigo[6], codigo[7], fecha); */
                return {
                    dni: codigo[8],
                    lastName: codigo[5],
                    name: codigo[6],
                    gender: codigo[7],
                    date: fecha,
                };
            }
            else {
                let fecha = codigo[6]
                    .replaceAll("-", "/")
                    .split("/")
                    .reverse()
                    .join("-");
                /*   return (codigo[4], codigo[1], codigo[2], codigo[3], fecha); */
                return {
                    dni: codigo[4],
                    lastName: codigo[1],
                    name: codigo[2],
                    gender: codigo[3],
                    date: fecha,
                };
            }
        }
    } catch (error) {
        console.error(error)
        return null
    }
}
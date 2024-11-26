export type ClientSelectDTO = {
    client: string
    dni: number | string
    phone: string | number
}


export interface sendDataClient {
    dni: string;
    lastName: string;
    name: string;
    gender: string;
    date: string;
}


export interface ScanerDTO {
    n_documento: string | number
    nombre: string
    apellido: string
    fecha_nacimiento: string
    genero: string
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
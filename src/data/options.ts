export const optionsTypeObject = [
    { text: "ANTEOJOS", value: "ANTEOJOS" },
    { text: "BILLETERA", value: "BILLETERA" },
    { text: "BUFANDA", value: "BUFANDA" },
    { text: "BUZO", value: "BUZO" },
    { text: "CAMPERA", value: "CAMPERA" },
    { text: "CARTERA", value: "CARTERA" },
    { text: "CELULAR", value: "CELULAR" },
    { text: "CIGARRILLOS", value: "CIGARRILLOS" },
    { text: "DNI", value: "DNI" },
    { text: "ENCENDEDOR", value: "ENCENDEDOR" },
    { text: "GORRA", value: "GORRA" },
    { text: "LLAVES", value: "LLAVES" },
    { text: "PARAGUAS", value: "PARAGUAS" },
    { text: "RIÑONERA", value: "RIÑONERA" },
    { text: "SACO", value: "SACO" },
    { text: "SUBE", value: "SUBE" },
    { text: "TARJETA", value: "TARJETA" },
    { text: "OTRO", value: "OTRO" },
];

export const optionsTypeLocation = [
    { text: "ENTRADA PRINCIPAL", value: "ENTRADA PRINCIPAL" },
    { text: "SALA PRINCIPAL", value: "SALA PRINCIPAL" },
    { text: "SALA BINGO", value: "SALA BINGO" },
    { text: "SALA 1", value: "SALA 1" },
    { text: "SALA 2", value: "SALA 2" },
    { text: "SALA 3", value: "SALA 3" },
    { text: "SALA 4", value: "SALA 4" },
    { text: "BAÑO FEMENINO", value: "BAÑO FEMENINO" },
    { text: "BAÑO MASCULINO", value: "BAÑO MASCULINO" },
    { text: "BAÑO DISCAPACITADO", value: "BAÑO DISCAPACITADO" },
    { text: "OTRO", value: "OTRO" }
];


export interface BrandDTO {
    value: string
    label: string
}
//data de la marca de celulares
export const brandPhone: BrandDTO[] = [
    { value: "APPLE", label: "APPLE" },
    { value: "HUAWEI", label: "HUAWEI" },
    { value: "MOTOROLA", label: "MOTOROLA" },
    { value: "NOKIA", label: "NOKIA" },
    { value: "SAMSUNG", label: "SAMSUNG" },
    { value: "XIAOMI", label: "XIAOMI" },
    { value: "ZTE", label: "ZTE" },
    { value: "OTRO", label: "OTRO" },
]

//data de la marca para otro tipo de objeto gorra 
export const brandGap: BrandDTO[] = [
    { value: "47BRAND", label: "47 BRAND" },
    { value: "NEWERA", label: "New Era" },
    { value: "ADIDAS", label: "ADIDAS" },
    { value: "NIKE", label: "NIKE" },
    { value: "PUMA", label: "PUMA" },
    { value: "UNDERARMOUR", label: "UNDER ARMOUR" },
    { value: "VANS", label: "VANS" },
    { value: "CONVERSE", label: "CONVERSE" },
    { value: "QUIKSILVER", label: "QUIKSILVER" },
    { value: "DCSHOES", label: "DCSHOES" },
    { value: "OTRO", label: "OTRO" },
]

//data de la marca para tipo de objeto  cigarrilos
export const brandCigarette: BrandDTO[] = [
    { value: "BOSTON", label: "BOSTON" },
    { value: "CHESTERFIELD BLUE", label: "CHESTERFIELD BLUE" },
    { value: "CHESTERFIELD GREEN", label: "CHESTERFIELD GREEN" },
    { value: "LUCKY STRIKE", label: "LUCKY STRIKE" },
    { value: "MARLBORO", label: "MARLBORO" },
    { value: "RUMBA", label: "RUMBA" },
    { value: "STAR LITE", label: "STAR LITE" },
    { value: "OTRO", label: "OTRO" },
]

//data de la marca para el tipo de objeto cartera
export const brandBriefcase: BrandDTO[] = [
    { value: "ADIDAS", label: "ADIDAS" },
    { value: "ADOLFO DOMINGUEZ", label: "ADOLFO DOMINGUEZ" },
    { value: "BURBERRY", label: "BURBERRY" },
    { value: "CHENSON", label: "CHENSON" },
    { value: "COACH", label: "COACH" },
    { value: "LOUIS VUITTON", label: "LOUIS VUITTON" },
    { value: "MICHAEL KORS", label: "MICHAEL KORS" },
    { value: "NIKE", label: "NIKE" },
    { value: "PRÜNE", label: "PRÜNE" },
    { value: "RALPH LAUREN", label: "RALPH LAUREN" },
    { value: "TOUS", label: "TOUS" },
    { value: "OTRO", label: "OTRO" },
]

//data de la marca para el tipo de objeto campera/buzo
export const brandTopClothing: BrandDTO[] = [
    { value: "ADIDAS", label: "ADIDAS" },
    { value: "CHEVIGNON", label: "CHEVIGNON" },
    { value: "COLUMBIA", label: "COLUMBIA" },
    { value: "GAP", label: "GAP" },
    { value: "KEVINGSTON", label: "KEVINGSTON" },
    { value: "MANGO", label: "MANGO" },
    { value: "NIKE", label: "NIKE" },
    { value: "RUSTY", label: "RUSTY" },
    { value: "THE NORTH FACE", label: "THE NORTH FACE" },
    { value: "ZARA", label: "ZARA" },
    { value: "OTRO", label: "OTRO" },
]
//data para los demas objetos q no se contemplan sus marcas sino que se tipea lo mas normal
export const branOthers: BrandDTO[] = [
    { value: "OTRO", label: "OTRO" },
]
//tipo de valores q se excluyen para ahorrar lineas de codigo
export const excludedTypes = [
    "CELULAR",
    "GORRA",
    "CIGARRILLOS",
    "CARTERA",
    "CAMPERA",
    "BUZO",
    "DNI",
];
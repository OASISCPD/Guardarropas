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
    { text: "BAÑO FEMENINO", value: "BAÑO FEMENINO" },
    { text: "BAÑO MASCULINO", value: "BAÑO MASCULINO" },
    { text: "ENTRADA PRINCIPAL", value: "ENTRADA PRINCIPAL" },
    { text: "EP1", value: "EP1" },
    { text: "EP2", value: "EP2" },
    { text: "EP3", value: "EP3" },
    { text: "FABO", value: "FABO" },
    { text: "FABULOUS", value: "FABULOUS" },
    { text: "KM50", value: "KM50" },
    { text: "LUXOR", value: "LUXOR" },
    { text: "OTRO", value: "OTRO" },
    { text: "SALA 1", value: "SALA 1" },
    { text: "SALA 2", value: "SALA 2" },
    { text: "SALA 3", value: "SALA 3" },
    { text: "SALA 4", value: "SALA 4" },
    { text: "SALA BINGO", value: "SALA BINGO" },
    { text: "SALA PRINCIPAL", value: "SALA PRINCIPAL" }
];



export interface BrandDTO {
    value: string
    label: string
}
//data de la marca de celulares
export const brandPhone: BrandDTO[] = [
    { value: "APPLE", label: "APPLE" },
    { value: "SAMSUNG", label: "SAMSUNG" },
    { value: "MOTOROLA", label: "MOTOROLA" },
    { value: "XIAOMI", label: "XIAOMI" },
    { value: "HUAWEI", label: "HUAWEI" },
    { value: "NOKIA", label: "NOKIA" },
    { value: "ZTE", label: "ZTE" },
    { value: "OTRO", label: "OTRO" },
]

// Modelos específicos por marca para celulares
export const phoneModels: Record<string, BrandDTO[]> = {
    "APPLE": [
        { value: "IPHONE 15", label: "iPhone 15" },
        { value: "IPHONE 14", label: "iPhone 14" },
        { value: "IPHONE 13", label: "iPhone 13" },
        { value: "IPHONE 12", label: "iPhone 12" },
        { value: "IPHONE 11", label: "iPhone 11" },
        { value: "IPHONE SE", label: "iPhone SE" },
        { value: "IPHONE XS", label: "iPhone XS" },
        { value: "IPHONE XR", label: "iPhone XR" },
        { value: "IPHONE X", label: "iPhone X" },
        { value: "IPHONE 8", label: "iPhone 8" },
        { value: "OTRO", label: "Otro modelo" }
    ],
    "SAMSUNG": [
        { value: "GALAXY S24", label: "Galaxy S24" },
        { value: "GALAXY S23", label: "Galaxy S23" },
        { value: "GALAXY S22", label: "Galaxy S22" },
        { value: "GALAXY A54", label: "Galaxy A54" },
        { value: "GALAXY A34", label: "Galaxy A34" },
        { value: "GALAXY A14", label: "Galaxy A14" },
        { value: "GALAXY NOTE 20", label: "Galaxy Note 20" },
        { value: "GALAXY Z FOLD", label: "Galaxy Z Fold" },
        { value: "GALAXY Z FLIP", label: "Galaxy Z Flip" },
        { value: "GALAXY A03", label: "Galaxy A03" },
        { value: "OTRO", label: "Otro modelo" }
    ],
    "MOTOROLA": [
        { value: "MOTO G84", label: "Moto G84" },
        { value: "MOTO G73", label: "Moto G73" },
        { value: "MOTO G53", label: "Moto G53" },
        { value: "MOTO G32", label: "Moto G32" },
        { value: "MOTO G22", label: "Moto G22" },
        { value: "MOTO E32", label: "Moto E32" },
        { value: "MOTO E22", label: "Moto E22" },
        { value: "EDGE 40", label: "Edge 40" },
        { value: "EDGE 30", label: "Edge 30" },
        { value: "OTRO", label: "Otro modelo" }
    ],
    "XIAOMI": [
        { value: "REDMI NOTE 13", label: "Redmi Note 13" },
        { value: "REDMI NOTE 12", label: "Redmi Note 12" },
        { value: "REDMI NOTE 11", label: "Redmi Note 11" },
        { value: "REDMI 12", label: "Redmi 12" },
        { value: "REDMI A2", label: "Redmi A2" },
        { value: "MI 11", label: "Mi 11" },
        { value: "POCO X5", label: "POCO X5" },
        { value: "POCO M5", label: "POCO M5" },
        { value: "OTRO", label: "Otro modelo" }
    ],
    "HUAWEI": [
        { value: "P60", label: "P60" },
        { value: "P50", label: "P50" },
        { value: "MATE 50", label: "Mate 50" },
        { value: "NOVA 11", label: "Nova 11" },
        { value: "Y90", label: "Y90" },
        { value: "Y70", label: "Y70" },
        { value: "OTRO", label: "Otro modelo" }
    ],
    "NOKIA": [
        { value: "G42", label: "G42" },
        { value: "G22", label: "G22" },
        { value: "C32", label: "C32" },
        { value: "C22", label: "C22" },
        { value: "OTRO", label: "Otro modelo" }
    ],
    "ZTE": [
        { value: "BLADE A73", label: "Blade A73" },
        { value: "BLADE A53", label: "Blade A53" },
        { value: "OTRO", label: "Otro modelo" }
    ]
};

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


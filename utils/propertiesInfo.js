import * as config from './config.js';

//Recebe uma lista de strings que correspondem aos seletores CSS de onde possivelmente 
//tem a informação do tipo de Lote e atribui um valor padrão para o "type_bem" no objeto final.
export function propertyType(stringList) {
    const typeMappings = [
        { keywords: config.RURAL_AREA_LIST, type: "Área Rural" },
        { keywords: config.APARTAMENT_LIST, type: "Apartamento" },
        { keywords: config.HOME_LIST, type: "Casa" },
        { keywords: config.LAND_LIST, type: "Terreno" },
        { keywords: config.COMERCIAL_LIST, type: "Comercial" }
    ];

    // Verifica cada string na lista
    for (const stringType of stringList) {
        let lowerCaseType = stringType.toLowerCase();

        for (const { keywords, type } of typeMappings) {
            if (keywords.some(keyword => lowerCaseType.includes(keyword)) &&
                config.INVALID_STRINGS.every(invalid => !lowerCaseType.includes(invalid))) {
                return type;
            }
        }
    }

    // Retorna 'Indefinido' se nenhuma das strings na lista contém uma palavra-chave de tipo de propriedade
    return config.STRING_INVALID_LOT;
}

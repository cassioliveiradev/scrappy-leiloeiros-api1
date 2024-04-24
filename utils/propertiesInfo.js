import * as propertyLists from './propertyTypesList.js'

//Recebe uma lista de strings que correspondem aos seletores CSS de onde possivelmente 
//tem a informação do tipo de Lote e atribui um valor padrão para o "type_bem" no objeto final.
export function propertyType(stringList) {
    const typeMappings = [
        { keywords: propertyLists.ruralAreaList, type: "Área Rural" },
        { keywords: propertyLists.apartmentList, type: "Apartamento" },
        { keywords: propertyLists.homeList, type: "Casa" },
        { keywords: propertyLists.landList, type: "Terreno" },
        { keywords: propertyLists.comercialList, type: "Comercial" }
    ];

    // Verifica cada string na lista
    for (const stringType of stringList) {
        let lowerCaseType = stringType.toLowerCase();

        for (const { keywords, type } of typeMappings) {
            if (keywords.some(keyword => lowerCaseType.includes(keyword))) {
                return type;
            }
        }
    }

    // Retorna 'Indefinido' se nenhuma das strings na lista contém uma palavra-chave de tipo de propriedade
    return config.STRING_INVALID_LOT;
}

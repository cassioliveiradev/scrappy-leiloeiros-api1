/*
*Recebe uma lista de strings, percorre cada elemento e verifica se tem algum dos padroes do regex. 
*Se encontrar o valor, armazena  e continua percorrendo até o ultimo elemento da lista.
*Compara o maior valor do elemento atual com o do anterior e armazena o maior.
*O resultado da função é o maior valor de área que foi encontrado entre as strings do parâmetro
*/
export function getFootage(stringList) {
    // Expressão regular para encontrar números seguidos de unidades de área
    const regex = /(\d{1,3}(?:\.\d{3})*(?:,\d+)?)(?:\s*)(m²|m³|metros quadrados|metro quadrado|m2|M2)/g;

    let maxArea = 0;

    stringList.forEach(span => {
        let matches;
        let numeros = [];

        // Procura todos os matches na string atual
        while ((matches = regex.exec(span)) !== null) {
            let numeroFormatado = matches[1].replace(/\./g, '').replace(/,/g, '.');
            numeros.push(parseFloat(numeroFormatado));
        }

        // Encontra o maior número na string atual, se houver
        if (numeros.length > 0) {
            let maxCurrent = Math.max(...numeros);
            // Compara o maior número da string atual com o máximo global
            if (maxCurrent > maxArea) {
                maxArea = maxCurrent;
            }
        }
    });

    // Retorna a maior área encontrada entre todas as strings
    return maxArea;
}

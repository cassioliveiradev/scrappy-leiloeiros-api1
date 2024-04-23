export async function findProcess(texto) {
    const regexes = [
        /\d{7}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}/g,
    ];

    for (const regex of regexes) {
        const match = texto.match(regex);
        if (match) {
            // Retorna a primeira correspondência encontrada que não seja apenas pontos
            return match[0]
        }
    }

    return '';
}

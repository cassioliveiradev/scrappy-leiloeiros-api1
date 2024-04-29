//Valida se o formato da string do número do processo segue o padrão.
export async function findProcess(texto) {
    const regexes = [
        /\d{7}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}/g,   // Processo no formato 0000000-00.0000.0.00.0000
        /\d{7}-\s*\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}/g, // Processo no formato 0000000- 00.0000.0.00.0000 (com espaço após o hífen)
        /\d{7}-\s*\d{2}\.\d{4}\.\d{3}\.\d{4}/g, // Processo no formato 0000000-00.0000.000.0000 (sem o ponto entre os antepenultimo e penultimos dígitos e com espaço apos o hífen)
        /\d{7}-\d{2}\.\d{4}\.\d{3}\.\d{4}/g // Processo no formato 0000000-00.0000.000.0000 (sem o ponto entre os antepenultimo e penultimos dígitos)
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

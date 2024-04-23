
const userAgents = [
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0',
    'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko',
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
    'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.152 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 8.1.0; Nexus 5X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.105 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 11; Galaxy Note20) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPad; CPU OS 13_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
];

export function getRandomUserAgent() {
    return userAgents[Math.floor(Math.random() * userAgents.length)];
}

//Cabeçalho da requisição usado para obtenção da pagina HTML via fetch
// export const optionsUniqueItemPage = {
//     method: 'POST',
//     headers: {
//         'User-Agent': getRandomUserAgent(),
//         'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
//         'Accept-Language': 'pt-BR,en-US;q=0.7,en;q=0.3',
//         'Accept-Encoding': 'gzip, deflate, br',
//         'Sec-Fetch-Dest': 'document',
//         'Sec-Fetch-Mode': 'navigate',
//         'Sec-Fetch-Site': 'none',
//         'Connection': 'keep-alive',
//         'Upgrade-Insecure-Requests': '1',
//         'Sec-Fetch-User': '?1',
//         'Cache-Control': 'no-cache',
//         'TE': 'trailers',
//         'Pragma': 'no-cache',
//         'Cache-Control': 'no-cache'
//     }
// }

//Cabeçalho da requisição para obtenção dos dados dos lotes da pagina de pesquisa
export function getoOptionsItemsList(url) { 
    const optionsItemsList = {
        method: 'POST',
        headers: {
            'User-Agent': getRandomUserAgent(),
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Accept-Language': 'pt-BR,en-US;q=0.7,en;q=0.3',
            'Accept-Encoding': 'gzip, deflate, br',
            'Referer': `${url}/`,
            'Content-Type': 'application/json; charset=utf-8',
            'X-Requested-With': 'XMLHttpRequest',
            'Origin': `${url}`,
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(
            {
                "Bairro": "",
                "Busca": "",
                "BuscaProcesso": "",
                "CFGs": "[]",
                "CodLeilao": "",
                "DataAbertura": "",
                "DataEncerramento": "",
                "Filtro": {},
                "ID_Categoria": 0,
                "ID_Cidade": 0,
                "ID_Estado": 0,
                "ID_Leiloes_Status": [],
                "ID_Regiao": 0,
                "IgnoreScopo": 0,
                "Mapa": "",
                "NomesPartes": "",
                "Ordem": 0,
                "OrientacaoBusca": 0,
                "PracaAtual": 0,
                "QtdPorPagina": 36,
                "RangeValores": 0,
                "Scopo": 0,
                "sInL": "",
                "SubStatus": [],
                "TiposLeiloes": [],
                "ValorMaxSelecionado": 0,
                "ValorMinSelecionado": 0
            }
        )
    }

    return optionsItemsList;
}

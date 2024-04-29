import * as config from './config.js';

export function getRandomUserAgent() {
    return config.USER_AGENTS[Math.floor(Math.random() * config.USER_AGENTS.length)];
}

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

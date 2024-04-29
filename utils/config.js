//Dados para obtenção dos lotes da pagina inicial e cálculo da paginação
export const QUANT_ITEMS_PER_PAGE = 36;
export const TOTAL_LOADING_ITEMS = 8;
export const MAX_PAGE_INDEX = 5

//Intervalo mínimo e máximo para os delay do sistema
export const MIN_RANGE_DELAY = 3000; // TEMPO EM MILISSEGUNDOS
export const MAX_RANGE_DELAY = 10000; // TEMPO EM MILISSEGUNDOS

//Seletores CSS para extração da descrição e das coordenadas da pagina do lote
export const DESCRIPTION_SELECTORS_LIST = ['div.dg-lote-descricao-txt', 'div.dg-desc-block'];
export const COORDINATES_SELECTOR = 'div.dg-lote-mapa #map iframe';

//Configurações para o salvamento dos dados nos arquivos
export const FILE_EXTENSION = '.json';
export const FILE_DIRECTORY = './dados';
export const FINAL_FILE_NAME = `todos-lotes-leiloeiros${FILE_EXTENSION}`;

export const STRING_INVALID_LOT = 'Indefinido';

export const RURAL_AREA_LIST = ['rura', 'gleba', 'área de terras', 'fazenda', 'sitio'];
export const APARTAMENT_LIST = ['apartamento', 'apto'];
export const HOME_LIST = ['casa', 'residencia', 'chacara', 'sobrado'];
export const LAND_LIST = ['terreno', 'lote de terra', 'loteamento', 'lote'];
export const COMERCIAL_LIST = ['comercia', 'prédio', 'predio', 'galpao', 'galpão', 'industrial', 'loja'];

export const INVALID_STRINGS = [
    'veículo', 
    'veiculo', 
    'maquina', 
    'máquina', 
    'ferramenta', 
    'maquinario', 
    'maquinário', 
    'carro', 
    'moto'
];

export const USER_AGENTS = [
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

// >>>>>> ATENÇÃO <<<<< COLOCAR A URL SEM BARRA (/) NO FINAL POIS NÃO FUNCIONA, RETORNA ERRO 404
export const SITES = [
    { url: 'https://www.amazonasleiloes.com.br', name: 'Amazonas Leilões' },
    { url: 'https://www.nrnleiloes.com.br', name: 'NRN Leilões' },
    { url: 'https://www.multipliqueleiloes.com.br', name: 'Multiplique Leilões' },
    { url: 'https://www.mgl.com.br', name: 'MGL Leilões' },
    { url: 'https://www.gfleiloes.com.br', name: 'GF Leilões' },
    { url: 'https://www.bcoleiloes.com.br', name: 'BCO Leilões' },
    { url: 'https://www.vianaleiloes.com.br', name: 'Viana Leilões' },
    { url: 'https://www.nacionalleiloes.com.br', name: 'Nacional Leilões' },
    { url: 'https://www.douglasleiloeiro.com.br', name: 'Douglas Leiloeiro' },
    { url: 'https://www.venetoleiloes.com.br', name: 'Veneto Leilões' },
    { url: 'https://www.trustbid.com.br', name: 'Trust Bid' },
    { url: 'https://www.agleiloes.com.br', name: 'AG Leilões' },
    { url: 'https://www.milhaoleiloes.com.br', name: 'Milhão Leilões' },
    { url: 'https://www.telesleiloes.com.br', name: 'Teles Leilões' },
    { url: 'https://www.destakleiloes.com.br', name: 'Destak Leilões' },
    { url: 'https://www.legisleiloes.com.br', name: 'Legis Leilões' },
    { url: 'https://www.franklinleiloes.com.br', name: 'Franklin Leilões' },
    { url: 'https://www.agsleiloes.com.br', name: 'AGS Leilões' },
    { url: 'https://www.d1lance.com.br', name: 'D1 Lance' },
    { url: 'https://www.sublimeleiloes.com.br', name: 'Sublime Leilões' },
    { url: 'https://www.vivaleiloes.com.br', name: 'Viva Leilões' },
    { url: 'https://www.tabaleiloes.com.br', name: 'Taba Leilões' },
    { url: 'https://www.casareisleiloes.com.br', name: 'Casa Reis Leilões' },
    { url: 'https://www.atrioleiloes.com.br', name: 'Atrio Leilões' },
    { url: 'https://www.leilaooficialonline.com.br', name: 'Leilão Oficial Online' },
    { url: 'https://www.projudleiloes.com.br', name: 'Projud Leilões' },
    { url: 'https://www.vendasjudiciais.com.br', name: 'Vendas Judiciais' },
    { url: 'https://www.grupoarremateleiloes.com.br', name: 'Grupo Arremate Leilões' }
];

export const SITES_WITH_DIFERENT_DATE = [
    'mgl.com.br'
];

export const INVALID_DATE = [
    '1900-01-01T00:00:00',
    '1900-01-01 00:00:00'
];
//Dados para obtenção dos lotes da pagina inicial e cálculo da paginação
export const QUANT_ITEMS_PER_PAGE = 36;
export const TOTAL_LOADING_ITEMS = 8;
export const MAX_PAGE_INDEX = 5

//Intervalo mínimo e máximo para os delay do sistema
export const MIN_RANGE_DELAY = 2000; // TEMPO EM MILISSEGUNDOS
export const MAX_RANGE_DELAY = 7000; // TEMPO EM MILISSEGUNDOS

//Seletores CSS para extração da descrição e das coordenadas da pagina do lote
export const DESCRITION_SELECTOR = 'div.dg-lote-descricao-txt';
export const COORDINATES_SELECTOR = 'div.dg-lote-mapa #map iframe';

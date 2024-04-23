import fetch from "node-fetch";
import * as dateTime from './dateTimeUtils.js';
import * as optionsConfig from "./requestOptions.js";

// Intermediário antes de fazer o consumo da API apenas adicionando um delay antes da requisição
export async function fetchWithDelay(url, options) {
    await dateTime.delay();
    return fetch(url, options);
}

// Monta a requisição antes de ser feito o consumo da API
export async function getAllItemsFromHome(url, page = 1, pageIndex = 1) {
    dateTime.delay();

    let options = JSON.parse(JSON.stringify(optionsConfig.getoOptionsItemsList(url)));
    let body = JSON.parse(options.body);
    body["Pagina"] = page;
    body["PaginaIndex"] = pageIndex;
    options.body = JSON.stringify(body);

    const PATH = `${url}/ApiEngine/GetBusca/${page}/${pageIndex}/0`;
    let items = await getDataJson(PATH, options);

    return items;
}

//Faz o consumo da API e retorna os valores em json.
export async function getDataJson(url, options = {}) {
    try {
        const response = await fetchWithDelay(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Erro ao obter dados:', error);
        return null;
    }
}

//Faz a requisição ao endpoint que retorna o conteúdo em HTML da página do lote individual, 
//para obtenção da descrição do mesmo
export async function fetchHtml(url) {
    const response = await fetchWithDelay(url, optionsConfig.optionsUniqueItemPage);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.text();
}

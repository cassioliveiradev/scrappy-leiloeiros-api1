import { promises as fs } from 'fs';
import puppeteer from 'puppeteer';
import * as footage from './findFootage.js';
import * as process from './findProcess.js';
import * as property from './propertiesInfo.js';
import * as optionsConfig from "./requestOptions.js";
import * as connection from './connectionUtils.js';
import * as dateTime from './dateTimeUtils.js';
import * as config from './config.js';

export function getPaginationData(firstCall) {
    let totalItems = firstCall.CountTotal;
    const pageNumber = totalItems / config.QUANT_ITEMS_PER_PAGE;
    const totalPages = Number.isInteger(pageNumber) ? pageNumber : Math.ceil(pageNumber);
    const remainingItemsOnLastPage = totalItems % config.QUANT_ITEMS_PER_PAGE;
    const lastIndexPage = Math.ceil(remainingItemsOnLastPage / config.TOTAL_LOADING_ITEMS);

    return { totalPages, lastIndexPage };
}

//Principalmente usado para extrair a descrição da tela mas pode ser reutilizada
// function extractTextFromHtml(htmlString, cssSelector) {
//     const dom = new JSDOM(htmlString);
//     const doc = dom.window.document;
//     const elemento = doc.querySelector(cssSelector);
//     return elemento ? elemento.textContent.trim() : null;
// }

export async function iterateOverEachPageAndReturnAllProperties(url, totalPages, lastIndexPage) {
    let items = [];
    let allLots = [];

    for (let page = 1; page <= totalPages; page++) {
        dateTime.delay();
        var pageIndex = (page === totalPages) ? lastIndexPage : config.MAX_PAGE_INDEX;

        let itemsPerPage = await connection.getAllItemsFromHome(url, page, pageIndex);

        if (itemsPerPage.Lotes && itemsPerPage.Lotes[0]) {
            items.push(itemsPerPage);
        } else {
            console.log("Nenhum item encontrado nesta consulta.");
        }

        allLots = items.reduce((acc, currentItem) => {
            if (currentItem && currentItem.Lotes.length > 0) {
                acc.push(...currentItem.Lotes);
            }

            return acc;
        }, []);

        dateTime.delay();
    }

    return allLots;
}

async function getDataFromLotPage(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const randomUserAgent = optionsConfig.getRandomUserAgent();
    await page.setUserAgent(randomUserAgent);

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

    dateTime.delay();

    // const coordinatesSelector = 'div.dg-lote-mapa #map iframe"]'
    // const coordinatesSelector = 'a[title="Informar erros no mapa ou nas imagens para o Google"]'
    // await page.waitForSelector(config.COORDINATES_SELECTOR, { visible: true, timeout: 5000 });

    const pageData = await page.evaluate((descriptionSelector, coordinatesSelector) => {
        const data = {
            description: '',
            coordinates: {
                latitude: 0,
                longitude: 0
            }
        };

        // Extrai descrição usando o seletor fornecido
        const descriptionElement = document.querySelector(descriptionSelector);
        data.description = descriptionElement ? descriptionElement.innerText.trim() : '';

        const iframe = document.querySelector(coordinatesSelector);

        if (iframe) {
            const src = iframe.src;
            const match = src.match(/q=(-?\d+\.\d+),%20*(-?\d+\.\d+)/);
            if (match) {
                data.coordinates = {
                    latitude: parseFloat(match[1]),
                    longitude: parseFloat(match[2])
                };
            }
        }

        return data;

    }, config.DESCRITION_SELECTOR, config.COORDINATES_SELECTOR);

    // Fecha o navegador
    await browser.close();

    // Retorna os dados extraídos
    return pageData;
}

export async function populateJsonObject(allLots, url, siteName) {
    const results = [];

    for (const lote of allLots) {

        const isValidLot = property.propertyType([lote.IconeCategoria, lote.Categoria]) !== 'Indefinido';

        if (isValidLot) {
            const link = `${url}/${lote.URLlote}`;
            const pageData = await getDataFromLotPage(link);

            const { latitude, longitude } = pageData.coordinates;
            const { description } = pageData;

            // const html = await connection.fetchHtml(link);
            // dateTime.delay();

            const hasProcess = lote.CFGForms.some(form => form.Label === "Processo" && form.Value);
            const processNumber = lote.CFGForms.find(form => form.Label === "Processo")?.Value || "";
            const type_bem = property.propertyType([lote.IconeCategoria, lote.Categoria]);

            // if (html) {
            // const description = extractTextFromHtml(html, '.dg-lote-descricao-txt');

            const firstAuctionDate = lote.GetLoteRealTime[0].DataHoraEncerramentoPrimeiraPraca;
            const secondAuctionDate = lote.GetLoteRealTime[0].DataHoraEncerramentoSegundaPraca;
            const firstAuctionPriceSite = lote.GetLoteRealTime[0].ValorMinimoLancePrimeiraPraca;
            const secondAuctionPriceSite = lote.GetLoteRealTime[0].ValorMinimoLanceSegundaPraca;

            const firstAuction = firstAuctionDate !== '1900-01-01T00:00:00' ? dateTime.formatDateTime(firstAuctionDate) : '';
            const secondAuction = secondAuctionDate !== '1900-01-01T00:00:00' ? dateTime.formatDateTime(secondAuctionDate) : '';
            
            const firstAuctionPrice = firstAuction && firstAuction !== '' ? firstAuctionPriceSite : 0;
            const secondAuctionPrice = secondAuction && secondAuction !== '' ? secondAuctionPriceSite : 0;

            const result = {
                title: `${lote.Leilao} - ${lote.Lote_Bairro} - ${lote.Cidade}/${lote.UF}`,
                state: lote.UF,
                city: lote.Cidade,
                link: `${url}/${lote.URLlote}`,
                first_auction_price: firstAuctionPrice,
                second_auction_price: secondAuctionPrice,
                first_auction: firstAuction,
                second_auction: secondAuction,
                footage: footage.getFootage([`${lote.Lote}`, `${lote.Leilao}`, description]),
                address: `${lote.Lote_Endereco}, ${lote.Lote_Numero}, ${lote.Lote_Bairro}, ${lote.Cidade}, ${lote.UF}`,
                type_bem: type_bem,
                description: description,
                img: `${url}/imagens-center/350x282/${lote ? lote?.Fotos[0]?.Foto : 0}`,
                posted: false,
                auctioneer: siteName,
                type: hasProcess ? "Judicial" : "Extrajudicial",
                process: await process.findProcess(processNumber),
                status: lote.GetLoteRealTime[0].Lote_SubStatus_Label,
                latitude: latitude,
                longitude: longitude
            };

            results.push(result);

        }
    }

    return results;
}

//Varre a lista de objetos e verifica se algum deles está duplicado, retornando uma lista com apenas itens ÚNICOS.
export function duplicateRemoval(list) {
    const uniqueObjects = [];
    const alreadyStored = new Set();

    for (const item of list) {
        const value = JSON.stringify(item);

        if (!alreadyStored.has(value)) {
            alreadyStored.add(value);
            uniqueObjects.push(item);
        }
    }

    return uniqueObjects;
}

//Remove Lotes com type_bem Indefinido
export function filterResults(results) {
    return results.filter(result => result.type_bem !== 'Indefinido');
}

export function saveToJsonFile(validLots, url) {
    //Lista final convertida para string apenas para salvar em arquivo.
    const dataString = JSON.stringify(validLots, null, 2);

    const fileName = url.split('https://www.')[1];
    
    // Salva a lista em um arquivo 
    fs.writeFile(`./dados/${fileName}.json`, dataString, (err) => {
        if (err) {
            console.log('Erro ao salvar o arquivo:', err);
        } else {
            console.log(`Dados salvos com sucesso em /dados/${fileName}.json\n\n`);
        }
    });
    
}
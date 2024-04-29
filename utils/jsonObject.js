import * as fs from 'fs';
import puppeteer from 'puppeteer';
import path from 'path';
import * as footage from './findFootage.js';
import * as process from './findProcess.js';
import * as property from './propertiesInfo.js';
import * as optionsConfig from "./requestOptions.js";
import * as connection from './connectionUtils.js';
import * as dateTime from './dateTimeUtils.js';
import * as config from './config.js';

export function getPaginationData(firstCall) {
    let totalItems = firstCall.CountTotal || 0;
    const pageNumber = totalItems != 0 ? totalItems / config.QUANT_ITEMS_PER_PAGE : 0;
    const totalPages = pageNumber != 0 ? Number.isInteger(pageNumber) ? pageNumber : Math.ceil(pageNumber) : 0;
    const remainingItemsOnLastPage = totalItems != 0 ? totalItems % config.QUANT_ITEMS_PER_PAGE : 0;
    const lastIndexPage = remainingItemsOnLastPage != 0 ? Math.ceil(remainingItemsOnLastPage / config.TOTAL_LOADING_ITEMS) : 0;

    return { totalPages, lastIndexPage };
}

export async function iterateOverEachPageAndReturnAllProperties(url, totalPages, lastIndexPage) {
    let items = [];
    let allLots = [];

    if (totalPages != 0) {
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
    }

    return allLots;
}

//Através do Puppeteer, obtem os dados que só estão na pagina de cada lote individual. Atualmente descrição e coordenadas
async function getDataFromLotPage(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const randomUserAgent = optionsConfig.getRandomUserAgent();
    await page.setUserAgent(randomUserAgent);

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

    dateTime.delay();

    const pageData = await page.evaluate((descriptionSelectorsList, coordinatesSelector) => {
        const data = {
            description: '',
            coordinates: {
                latitude: 0,
                longitude: 0
            }
        };

        //Recebe uma lista de seletores e retorna a descrição do primeiro que encontrar e não estiver vazio
        function getDescriptionFromSelectors(selectorList) {
            for (const selector of selectorList) {
                const element = document.querySelector(selector);
                if (element && element.innerText.trim() !== '') {
                    return element.innerText.trim();
                }
            }

            return '';
        }

        // Extrai descrição usando o seletor fornecido
        data.description = getDescriptionFromSelectors(descriptionSelectorsList);

        const iframe = document.querySelector(coordinatesSelector);

        //Extrai as coordenadas
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

    }, config.DESCRIPTION_SELECTORS_LIST, config.COORDINATES_SELECTOR);//Passando os seletores como parametro

    // Fecha o navegador
    await browser.close();

    // Retorna os dados extraídos
    return pageData;
}

export async function populateJsonObject(allLots, url, siteName) {
    const results = [];

    try {
        for (const lote of allLots) {

            const isValidLot = property.propertyType([lote.IconeCategoria, lote.Categoria, lote.Lote, lote.Leilao]) !== config.STRING_INVALID_LOT;

            if (isValidLot) {
                const link = `${url}/${lote.URLlote}`;
                const pageData = await getDataFromLotPage(link);

                const { latitude, longitude } = pageData.coordinates;
                let { description } = pageData;

                description = normalizeText(description);

                const hasProcess = lote.CFGForms.some(form => form.Label === "Processo" && form.Value);
                const processNumber = lote.CFGForms.find(form => form.Label === "Processo")?.Value || "";
                const type_bem = property.propertyType([lote.IconeCategoria, lote.Categoria]);

                let firstAuction;
                let secondAuction;

                if (config.SITES_WITH_DIFERENT_DATE.includes(link)) {
                    firstAuction = extractAuctionDate(lote.GetLoteRealTime[0].DataHoraAberturaPrimeiraPraca);
                    secondAuction = extractAuctionDate(lote.GetLoteRealTime[0].DataHoraAberturaSegundaPraca)
                } else {
                    firstAuction = extractAuctionDate(lote.GetLoteRealTime[0].DataHoraEncerramentoPrimeiraPraca);
                    secondAuction = extractAuctionDate(lote.GetLoteRealTime[0].DataHoraEncerramentoSegundaPraca)
                }

                const { firstAuctionPrice, secondAuctionPrice } = extractAuctionPrices(lote);

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

    } catch (error) {
        console.log('Ocorreu um erro na extração dos dados: ', error)
    }

    return results;
}

//Remove marcações de formatação do texto, como quebras de linha e outros
function normalizeText(stringText) {
    const originalText = stringText;

    // Remove caracteres de nova linha e espaços excessivos
    stringText = stringText.replace(/\s+/g, ' ').trim();

    // Remove caracteres especiais indesejados, mantendo apenas texto e pontuação básica
    stringText = stringText.replace(/[^a-zA-Z0-9,.!?-áéíóúÁÉÍÓÚñÑàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛäëïöüÄËÏÖÜçÇ\s]/g, '');

    if (stringText === originalText) {
        return originalText;
    } else {
        return stringText;
    }
}

function extractAuctionPrices(lote) {
    const firstAuctionPriceSite = lote.GetLoteRealTime[0].ValorMinimoLancePrimeiraPraca;
    const secondAuctionPriceSite = lote.GetLoteRealTime[0].ValorMinimoLanceSegundaPraca;
    const firstAuctionPrice = firstAuctionPriceSite ? firstAuctionPriceSite : 0;
    const secondAuctionPrice = secondAuctionPriceSite ? secondAuctionPriceSite : 0;

    return { firstAuctionPrice, secondAuctionPrice };
}

//Retorna a data formatada no padrão ptBR, caso a data não seja inválida, segundo a lista em config.INVALID_DATE ou uma string vazia
function extractAuctionDate(dateParam) {
    const date = dateParam;

    if(!config.INVALID_DATE.includes(date)) {
        return dateTime.formatDateTime(date);
    }

    return '';
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
    return results.filter(result => result.type_bem !== config.STRING_INVALID_LOT);
}

//Remove Lotes que contenham algum dos termos da config.INVALID_STRINGS
export function removeLotsByInvalidKeyWord(items) {
    return items.filter(item => {
        const titleLower = item.title.toLowerCase();

        // Verifica se o campo título do objeto não contém nenhum dos termos "inválidos"
        return !config.INVALID_STRINGS.some(invalid => titleLower.includes(invalid));
    });
}

// Função para apagar arquivos originais exceto o unificado
export function deleteOriginalFiles() {
    dateTime.delay();
    const dir = config.FILE_DIRECTORY;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        if (file !== config.FINAL_FILE_NAME && file.endsWith(config.FILE_EXTENSION)) {
            fs.unlinkSync(path.join(dir, file));
        }
    });
}

// Função para unificar os JSON usando streams
export async function unifyJsonFilesStream() {
    const dir = config.FILE_DIRECTORY;
    const unifiedFilePath = path.join(dir, config.FINAL_FILE_NAME);
    const outputStream = fs.createWriteStream(unifiedFilePath, { flags: 'w' });

    outputStream.write('[');
    let firstFileProcessed = false;

    const files = fs.readdirSync(dir).filter(file => file.endsWith(config.FILE_EXTENSION));
    for (const file of files) {
        const filePath = path.join(dir, file);
        await new Promise((resolve, reject) => {
            const inputStream = fs.createReadStream(filePath);
            let dataBuffer = '';

            inputStream.on('data', (chunk) => {
                dataBuffer += chunk;
            });

            inputStream.on('end', () => {
                // Remove os colchetes de abertura e fechamento de cada arquivo
                dataBuffer = dataBuffer.trim();
                if (dataBuffer.startsWith('[')) {
                    dataBuffer = dataBuffer.substring(1);
                }
                if (dataBuffer.endsWith(']')) {
                    dataBuffer = dataBuffer.substring(0, dataBuffer.length - 1);
                }
                if (firstFileProcessed && dataBuffer.length > 0) {
                    outputStream.write(',');
                }
                outputStream.write(dataBuffer);
                firstFileProcessed = true;
                resolve();
            });

            inputStream.on('error', reject);
        });
    }

    outputStream.write(']');
    outputStream.end();
    return new Promise(resolve => outputStream.on('close', resolve));
}

export function saveToJsonFile(validLots, url) {
    //Lista final convertida para string apenas para salvar em arquivo.
    const dataString = JSON.stringify(validLots, null, 2);

    const fileName = url.split('https://www.')[1];

    // Salva a lista em um arquivo 
    fs.writeFile(`${config.FILE_DIRECTORY}/${fileName}${config.FILE_EXTENSION}`, dataString, (err) => {
        if (err) {
            console.log('Erro ao salvar o arquivo:', err);
        }
    });
}
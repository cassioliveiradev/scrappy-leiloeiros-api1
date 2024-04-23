import * as dateTime from './utils/dateTimeUtils.js';
import * as connection from './utils/connectionUtils.js';
import * as result from "./utils/jsonObject.js";
import sites from './utils/sitesInfo.js';

async function main() {
    for (const site of sites) {

        console.log(`\nIniciando extração de dados para: ${site.name} (${site.url})`);

        //Faz uma primeira chamada para obter a contagem total de itens, apenas
        let firstCall = await connection.getAllItemsFromHome(site.url);
        dateTime.delay();

        //Após a primeira conexão para obter o total de itens no SITE_NAME, calcula o total de paginas(paginação) 
        //que o mesmo terá para poder percorrer cada uma delas e obter os lotes
        const { totalPages, lastIndexPage } = result.getPaginationData(firstCall);

        //Com os valor da quantidade de páginas, percorre a lista de lotes de cada página(paginação) e os armazena em uma lista
        let allLots = await result.iterateOverEachPageAndReturnAllProperties(site.url, totalPages, lastIndexPage);

        //A partir da lista de lotes obtidas na função anterior, extrai esses dados e popula o objeto json final.
        const results = await result.populateJsonObject(allLots, site.url, site.name);

        //Garante que não haja itens duplicados
        const uniqueList = result.duplicateRemoval(results);

        //Remove atributo de controle 'status' de cada lote
        const resultsWithoutStatus = uniqueList.map(({ status, ...remainingObjects }) => remainingObjects);

        //Remove todos os lotes com a/as data(s) expiradas dos campos 'first_auction' e 'second_auction'
        const filteredResults = resultsWithoutStatus.filter(item => !dateTime.checkDatesExpired(item.date1, item.date2));

        //ESTA LISTA É A FINAL APÓS TODOS OS TRATAMENTOS
        const finalResult = result.filterResults(filteredResults);

        result.saveToJsonFile(finalResult, site.url);

        console.log(`Extração concluída para: ${site.name} (${site.url}) \n`);
    }
}

main();

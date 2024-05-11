# Projeto de Extração de Dados de Imóveis em Leilão

## Descrição
Este projeto é uma aplicação em JavaScript que acessa automaticamente diversos sites de leilões, extrai informações detalhadas sobre imóveis disponíveis para leilão e filtra esses dados com base em critérios específicos. 
O resultado é um arquivo JSON contendo uma lista organizada dos imóveis que atendem a esses critérios.

## Tecnologias Utilizadas
- **JavaScript**: Linguagem de programação utilizada para o desenvolvimento do script.
- **Node-fetch**: Utilizada para realizar requisições HTTP de forma assíncrona em aplicações Node.js.
- **Puppeteer**: Biblioteca que fornece uma API de alto nível para controlar o Chromium sobre o protocolo DevTools, utilizada para automação de ações nos sites de leilões.

## Funcionalidades
- **Acesso Automatizado a Sites**: A aplicação visita automaticamente os sites de leilões especificados.
- **Extração de Dados**: Extrai informações como descrição do imóvel, valor inicial do leilão, localização, entre outros.
- **Filtragem de Dados**: Aplica filtros configuráveis para selecionar imóveis que atendem a determinadas condições.
- **Geração de JSON**: Compila os dados extraídos em um arquivo JSON estruturado.

## Configuração do Projeto
1. Clone o repositório para sua máquina local:
2. Navegue até o diretório do projeto:
3. Instale as dependências necessárias com o comando ```npm install```:

## Execução
Para executar o script, utilize o comando: ```npm start```

## Estrutura de Dados
O arquivo JSON gerado segue estrutura do exemplo abaixo:
```json
[
  {
   "title": "1 Casa | Rua Soldado PM D'jango da Silva, 530 | Caranã - Caranã - Boa Vista/RR",
    "state": "RR",
    "city": "Boa Vista",
    "link": "https://www.amazonasleiloes.com.br/lote/1-casa-rua-soldado-pm-django-da-silva-530-carana/2621/",
    "first_auction_price": 350000,
    "second_auction_price": 175000,
    "first_auction": "15/05/2024 10:30",
    "second_auction": "22/05/2024 10:30",
    "footage": 1444,
    "address": "Rua Soldado-Polícia Militar Django da Silva, 530, Caranã, Boa Vista, RR",
    "type_bem": "Casa",
    "description": "01 um Imóvel, localizado na Rua Soldado PM Djando da Silva, nº 530, bairro Caran, Cidade de Boa Vista, Estado de Roraima, com as seguintes características Casa de Alvenaria, coberta com Telhas de Amianto, tipo Brasilit, com sala de estar, sala de jantar, cozinha e três quartos, sendo todos suítes, ainda uma pequena área em piso grosso. Toda murada, muro sem reboco com um porto em forro. Localizada em Rua asfaltada, sem meio fios, passando em frente, energia elétrica, água e esgoto sanitário, construída em um terreno irregular. Com metragem de 1.444,00m², sem habitase.",
    "img": "https://www.amazonasleiloes.com.br/imagens-center/350x282/6c4bff79-3047-4176-83c4-868ce493a238.png",
    "posted": false,
    "auctioneer": "Amazonas Leilões",
    "type": "Judicial",
    "process": "0827043- 32.2020.8.23.0010",
    "latitude": 2.842034817560783,
    "longitude": -60.71926765767171
  }
]

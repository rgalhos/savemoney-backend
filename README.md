<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

Repositório contendo a versão inicial do código do back-end do aplicativo SaveMoney, projeto da matéria Programação 3 do curso de Ciência da Computação - UFAL.

[Ver repositório do aplicativo (/JefersonFernando/save-money/)](https://github.com/JefersonFernando/save-money/)

## Installation

```bash
$ npm ci
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run build # run once
$ npm run start:prod
```

# Endpoints

## Produtos

### GET `/produtos/busca`

Busca um produto

Parâmetros:

-   `q` - Item a ser buscado
-   `latitude` (opcional) - Latitude do usuário
-   `longitude` (opcional) - Longitude do usuário
-   `raio` (opcional, padrão: 5) - Raio da busca

Resposta:

```typescript
// (src/interfaces/savemoney/search-product.ts - ISearchProductResponse)
type ISearchProductResponse = Array<{
    codBarra: string;
    nome: string;
}>;
```

### GET `produtos/[:código de barras]`

Retorna informações sobre o produto a partir do código de barras

Resposta:

```typescript
// RawModel<ProdutosModel> -> Tipo inferido de src/models/produtos.model.ts - ProdutosModel
interface {
    codBarra: string;
    nome: string
}
```

## Mercados

### GET `/lojas/[:cnpj]`

Retorna informações de um mercado a partir de seu CNPJ.

Resposta:

```typescript
// RawModel<LojasModel> -> Tipo inferido de src/models/lojas.model.ts - LojasModel
interface {
    cnpj: string;
    nome: string;
    endereco: string;
    cep: string;
    latitude: number;
    longitude: number;
}
```

## Lista de compras

### GET `/lista/`

Parâmetros:

-   `codBarras` - Código de barras de todos os produtos da lista de compras separados por `,`
-   `latitude` (opcional) - Latitude do usuário
-   `longitude` (opcional) - Longitude do usuário
-   `raio` (opcional, padrão: 3) - Raio da busca
-   `max`(opcional, padrão: 10) - Número máximo de listas a serem retornadas

Resposta:

```typescript
// (src/interfaces/savemoney/shopping-list.ts - IBuildShoppingListResponse)
type IBuildShoppingListResponse = Array<{
    loja: {
        cnpj: string;
        nome: string;
        endereco: string;
        cep: string;
        latitude: number;
        longitude: number;
    };
    produtos: Array<{
        codBarra: string;
        nome: string;
        preco: number;
    }>;
    matches: number;
    precoTotal: string;
    distancia: number; // -1 caso não tenha sido especificada uma localização
}>;
```

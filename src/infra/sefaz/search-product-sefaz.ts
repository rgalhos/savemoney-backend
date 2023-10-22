import axios from 'src/infra/axios-instance';
import type { ISearchProductResponse } from 'src/interfaces/savemoney/search-product';
import type {
    IPesquisaProdutoRequest,
    IPesquisaProdutoResponse,
} from 'src/interfaces/sefaz/search-product-sefaz';
import type { RawAnunciosModel } from 'src/models/anuncios.model';
import type { RawLojasModel } from 'src/models/lojas.model';
import type { RawProdutosModel } from 'src/models/produtos.model';

const SEARCH_ENDPOINT =
    'http://api.sefaz.al.gov.br/sfz-economiza-alagoas-api/api/public/produto/pesquisa';

export interface ISearchProductSefazParsedReturn {
    products: ISearchProductResponse;
    classifieds: RawAnunciosModel[];
    stores: RawLojasModel[];
}

export async function searchProductSefaz(
    query: string,
    {
        latitude,
        longitude,
        raio,
    }: { latitude?: string | number; longitude?: string | number; raio?: string | number },
): Promise<ISearchProductSefazParsedReturn> {
    const sefazQuery: IPesquisaProdutoRequest = {
        produto: {
            descricao: query,
        },
        estabelecimento: {
            municipio: {
                codigoIBGE: Number(process.env.CODIGO_IBGE),
            },
        },
        dias: 5,
        registrosPorPagina: 5000,
    };

    latitude = Number(latitude);
    longitude = Number(longitude);
    raio = Number(raio);

    if (!isNaN(latitude) && !isNaN(longitude) && latitude !== 0.0 && longitude !== 0.0) {
        delete sefazQuery.estabelecimento.municipio;

        sefazQuery.estabelecimento.geolocalizacao = {
            latitude: latitude,
            longitude: longitude,
            raio: !isNaN(raio) ? raio : 5,
        };
    }

    console.log(sefazQuery);

    const { data } = await axios.post<IPesquisaProdutoResponse>(SEARCH_ENDPOINT, sefazQuery);

    const cont = data.conteudo;
    const parsedProducts: Dictionary<RawProdutosModel> = {};
    const parsedStores: Dictionary<RawLojasModel> = {};
    const parsedClassifieds: RawAnunciosModel[] = [];
    const validProduct: Dictionary<number> = {};

    //#region for: itera sobre as vendas
    for (const el of cont) {
        const codBarras = el.produto.gtin;
        const loja = el.estabelecimento;
        let _ok = 0; // @todo

        //#region parse loja
        if (
            '0' !== loja.cnpj &&
            !Object.prototype.hasOwnProperty.call(parsedStores, loja.cnpj) &&
            loja.endereco
        ) {
            let endereco: string = loja.endereco.nomeLogradouro;
            if (loja.endereco.numeroImovel) endereco += ', n° ' + loja.endereco.numeroImovel;

            parsedStores[loja.cnpj] = {
                cnpj: loja.cnpj,
                cep: loja.endereco?.cep || '00000-000',
                endereco: endereco,
                latitude: loja.endereco.latitude,
                longitude: loja.endereco.longitude,
                nome: loja.nomeFantasia || loja.razaoSocial,
            };

            _ok++; // @todo
        }
        //#endregion parse loja

        //#region parse produto
        const descricao = el.produto.descricaoSefaz || el.produto.descricao;

        // produto válido, não duplicado
        if (
            '0' !== codBarras &&
            !Object.prototype.hasOwnProperty.call(parsedProducts, codBarras) &&
            descricao
        ) {
            parsedProducts[codBarras] = {
                codBarra: codBarras,
                nome: descricao,
            };

            _ok++; // @todo
        }
        //#endregion parse produto

        const valorVenda = el.produto?.venda?.valorVenda;
        //#region parse anúncio
        if (
            _ok === 2 && // @todo
            !isNaN(valorVenda) &&
            valorVenda > 0.0
        ) {
            parsedClassifieds.push({
                lojaId: loja.cnpj, // FK->lojas(cnpj)
                produtoId: codBarras, // FK->produtos(codBarras)
                preco: Number(valorVenda),
            });

            validProduct[codBarras] = (validProduct?.[codBarras] || 0) + 1;

            console.log(parsedClassifieds[parsedClassifieds.length - 1]);
        }
        //#endregion parse anúncio
    }
    //#endregion for: itera sobre as vendas

    // Alguns produtos podem ter o código de barras inválido
    delete parsedProducts['0'];

    return {
        products: Object.values(parsedProducts)
            .filter((product) => validProduct[product.codBarra] > 0)
            .sort((a, b) => validProduct[b.codBarra] - validProduct[a.codBarra]),
        classifieds: Object.values(parsedClassifieds),
        stores: Object.values(parsedStores),
    };
} // fn:searchProductSefaz

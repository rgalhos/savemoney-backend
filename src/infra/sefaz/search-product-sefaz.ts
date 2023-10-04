import axios from 'src/infra/axios-instance';
import type {
    IPesquisaProdutoRequest,
    IPesquisaProdutoResponse,
} from 'src/interfaces/sefaz/search-product-sefaz';
import { ProdutosModel } from 'src/models/produtos.model';

const SEARCH_ENDPOINT =
    'http://api.sefaz.al.gov.br/sfz-economiza-alagoas-api/api/public/produto/pesquisa';

export async function searchProductSefaz(query: string): Promise<any> {
    const { data } = await axios.post<IPesquisaProdutoResponse>(SEARCH_ENDPOINT, {
        produto: {
            descricao: query,
        },
        estabelecimento: {
            municipio: {
                codigoIBGE: Number(process.env.CODIGO_IBGE),
            },
        },
        dias: 1,
    } as IPesquisaProdutoRequest);

    const cont = data.conteudo;
    const parsedProducts: Dictionary<ProdutosModel> = {};

    for (const el of cont) {
        const codBarras = el.produto.gtin;
        const descricao = el.produto.descricaoSefaz || el.produto.descricao;

        if (parsedProducts[codBarras] || !descricao) {
            continue;
        }

        parsedProducts[codBarras] = {
            codBarra: codBarras,
            nome: descricao,
        } as ProdutosModel;
    }

    // Alguns produtos podem ter o código de barras inválido
    delete parsedProducts['0'];

    return Object.values(parsedProducts);
}

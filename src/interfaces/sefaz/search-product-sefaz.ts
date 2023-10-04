import type { GPC_codigo_t } from './GPC';

export interface IPesquisaProdutoRequest {
    /** @description Informações do produto. É obrigatório fornecer uma delas */
    produto: RequireAtLeastOne<{
        /** @description Código de barras */
        gtin: string;
        /** @description Nome parcial */
        descricao: string;
        /** @description Nomenclatura Comum do Mercosul (NCM) */
        ncm: string;
        /** @description GPC (Classificação Global de Produtos). Deve ser enviado junto com o GTIN */
        gpc: GPC_codigo_t;
    }>;
    /** @description Informações do estabelecimento e/ou localidade. É obrigatório fornecer uma delas */
    estabelecimento: RequireAtLeastOne<{
        /** @description Pesquisa por preço em estabelecimento individual */
        individual: {
            cnpj: string;
        };
        /** @description Pesquisa por município */
        municipio: {
            /** @description Código do IBGE do município; Maceió = 2704302 */
            codigoIBGE: number;
        };
        /** @description Limitar área */
        geolocalizacao: {
            latitude: number;
            longitude: number;
            /** @description Raio de alcance em quilômetros; Entre 1 e 15 */
            raio: number;
        };
    }>;
    /** @description Quantidade de dias da pesquisa. Entre 1 e 10 */
    dias: number;
    /**
     * @description Número da págfina a ser retornado. Padrão é 1. Mínimo 1, máximo 9999
     * @default 1
     */
    pagina?: number;
    /**
     * @description Quantidade de registros por página
     * @default 100
     */
    registrosPorPagina?: number;
}

export interface IPesquisaProdutoResponse {
    totalRegistros: number;
    totalPaginas: number;
    pagina: number;
    registrosPorPagina: number;
    registrosPagina: number;
    primeiraPagina: boolean;
    ultimaPagina: boolean;
    conteudo: Array<{
        produto: {
            /** @description Código fornecido pelo estabelecimento */
            codigo: string;
            /** @description Descrição fornecida pelo estabelecimento */
            descricao: string;
            /** @description Descrição fornecida pela SEFAZ */
            descricaoSefaz?: string;
            /** @description Código de Barras do produto. Em pesquisa que não sejam por código de barras, é fornecido apenas quando o estabelecimento informa na Nota Fiscal. */
            gtin: string;
            /** @description Código NCM do produto fornecido pelo estabelecimento */
            ncm: string;
            /** @description Retorna o valor 0 (zero) caso o produto não tenha sido classificado ou não possui GTIN. */
            gpc: 0 | GPC_codigo_t;
            /** @description Unidade de medida comercial declarado na última venda. */
            unidadeMedida: string;
            venda: {
                /** @description Padrão ISO 8601 */
                dataVenda: string;
                valorDeclarado: number;
                valorVenda: number;
            };
        };
        estabelecimento: {
            cnpj: string;
            razaoSocial: string;
            nomeFantasia: string;
            telefone: string;
        };
        endereco: {
            nomeLogradouro: string;
            numeroImovel: string;
            bairro: string;
            cep: string;
            /** @description Código do municipio */
            codigoIBGE: number;
            municipio: string;
            latitude: number;
            longitude: number;
        };
    }>;
}

export interface IPesquisaProdutoErrorResponse {
    timestamp: string;
    message: string;
}

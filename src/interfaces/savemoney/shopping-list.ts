export type IBuildShoppingListResponse = Array<{
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
    distancia: number | -1;
}>;

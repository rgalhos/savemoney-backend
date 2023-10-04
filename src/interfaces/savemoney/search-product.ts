export interface ISearchProductParams {
    q: string;
}

export type ISearchProductResponse = Array<{
    codBarra: string;
    nome: string;
}>;

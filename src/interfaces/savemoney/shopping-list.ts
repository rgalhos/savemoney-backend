import type { RawAnunciosModel } from 'src/models/anuncios.model';
import type { RawLojasModel } from 'src/models/lojas.model';

export type IBuildShoppingListResponse = Array<{
    loja: RawLojasModel;
    matches: number;
    valorTotal: number;
    produtos: RawAnunciosModel;
}>;

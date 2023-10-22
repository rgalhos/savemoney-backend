import { Injectable } from '@nestjs/common';
import { ProdutosService } from 'src/api/produtos/produtos.service';
import { LojasService } from 'src/api/lojas/lojas.service';
import { AnunciosService } from 'src/api/anuncios/anuncios.service';
import type { IBuildShoppingListResponse } from 'src/interfaces/savemoney/shopping-list';
import { AnunciosModel, RawAnunciosModel } from 'src/models/anuncios.model';
import { ProdutosModel, RawProdutosModel } from 'src/models/produtos.model';
import { LojasModel, RawLojasModel } from 'src/models/lojas.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ListaService {
    constructor(
        private readonly produtosService: ProdutosService,
        private readonly lojasService: LojasService,
        private readonly anunciosService: AnunciosService,
        @InjectModel(ProdutosModel)
        private readonly produtosModel: typeof ProdutosModel,
        @InjectModel(LojasModel)
        private readonly lojasModel: typeof LojasModel,
        @InjectModel(AnunciosModel)
        private readonly anunciosModel: typeof AnunciosModel,
    ) {}

    /**
     * @todo arrumar relacionamentos
     */
    async handleBuildShoppingList(arrCodBarras: string[]): Promise<IBuildShoppingListResponse> {
        console.log('<<<<<<<<<<<< ' + arrCodBarras.join('&'));

        const anuncios = await this.anunciosModel.findAll({
            where: {
                produtoId: arrCodBarras,
            } as WhereParams<AnunciosModel>,
            raw: true,
        });

        console.log({ anuncios }, anuncios.length);

        const idsProdutos = anuncios.map((x: RawAnunciosModel) => x.produtoId);
        const produtos = await this.produtosService.getManyProductsByCodBarra(idsProdutos);
        const produtosObj: Dictionary<RawProdutosModel> = {};

        for (const produto of produtos) {
            produtosObj[produto.codBarra] = produto;
        }

        const idsLojas = anuncios.map((x: RawAnunciosModel) => x.lojaId);
        const lojas = await this.lojasService.getManyStoresByCNPJ(idsLojas);
        const lojasObj: Dictionary<RawLojasModel> = {};

        for (const loja of lojas) {
            lojasObj[loja.cnpj] = loja;
        }

        const anunciosArr = anuncios.map((anuncio) => ({
            ...anuncio,
            produto: produtosObj[anuncio.produtoId],
            loja: lojasObj[anuncio.lojaId],
        }));

        const anunciosPorLoja: Dictionary<Array<RawProdutosModel & { preco: number }>> = {};

        for (const anuncio of anunciosArr) {
            if (!anunciosPorLoja[anuncio.lojaId]) {
                anunciosPorLoja[anuncio.lojaId] = [];
            }

            // Remove duplicados
            if (
                anunciosPorLoja[anuncio.lojaId].some((x: any) => x.codBarra === anuncio.produtoId)
            ) {
                continue;
            }

            anunciosPorLoja[anuncio.lojaId].push({
                ...anuncio.produto,
                preco: anuncio.preco,
            });
        }

        return Object.entries(anunciosPorLoja).map(([lojaId, lista]) => {
            return {
                loja: lojasObj[lojaId],
                produtos: lista,
                matches: lista.length,
                precoTotal: Number(lista.reduce((a: any, b: any) => a + b.preco, 0))?.toFixed(2),
            };
        });
    }
}

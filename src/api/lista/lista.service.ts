import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProdutosService } from 'src/api/produtos/produtos.service';
import { LojasService } from 'src/api/lojas/lojas.service';
import { AnunciosService } from 'src/api/anuncios/anuncios.service';
import type { IBuildShoppingListResponse } from 'src/interfaces/savemoney/shopping-list';
import { AnunciosModel, RawAnunciosModel } from 'src/models/anuncios.model';
import { ProdutosModel, RawProdutosModel } from 'src/models/produtos.model';
import { LojasModel, RawLojasModel } from 'src/models/lojas.model';
import { calculateDistance } from 'src/infra/calculate-distance';

type ICoordParams = {
    latitude: string;
    longitude: string;
    raio: string;
};

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
    async handleBuildShoppingList(
        arrCodBarras: string[],
        { latitude: latitudeParam, longitude: longitudeParam, raio: raioParam }: ICoordParams,
    ): Promise<IBuildShoppingListResponse> {
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

        const latitude = Number(latitudeParam);
        const longitude = Number(longitudeParam);
        const raio = isNaN(Number(raioParam)) ? 3 : Number(raioParam);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let coordFilterFn = (..._noop: unknown[]): number => -1;

        if (
            !isNaN(latitude) &&
            !isNaN(longitude) &&
            raio > 0.1 &&
            latitude < 90 &&
            latitude > -90 &&
            longitude > -180 &&
            longitude < 180
        ) {
            coordFilterFn = calculateDistance;
        }

        return Object.entries(anunciosPorLoja)
            .map(([lojaId, lista]) => ({
                loja: lojasObj[lojaId],
                produtos: lista,
                matches: lista.length,
                precoTotal: Number(lista.reduce((a: any, b: any) => a + b.preco, 0))?.toFixed(2),
                distancia: Number(
                    coordFilterFn(
                        latitude,
                        longitude,
                        lojasObj[lojaId].latitude,
                        lojasObj[lojaId].longitude,
                    ).toFixed(2),
                ),
            }))
            .filter((obj) => obj.distancia <= raio)
            .sort((a, b) => {
                // ordena primeiramente por ordem decrescente de matches
                if (b.matches !== a.matches) {
                    return b.matches - a.matches;
                }

                // segundamente por ordem crescente de preço
                if (a.precoTotal !== b.precoTotal) {
                    return +a.precoTotal - +b.precoTotal;
                }

                // terceiramente por ordem crescente de distância
                return +a.distancia - +b.distancia;
            });
    }
}

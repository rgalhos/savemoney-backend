import { Injectable } from '@nestjs/common';
import { ProdutosRepository } from 'src/api/produtos/produtos.repository';
import { ProdutosModel } from 'src/models/produtos.model';
import type { ISearchProductSefazParsedReturn } from 'src/infra/sefaz/search-product-sefaz';
import { LojasService } from 'src/api/lojas/lojas.service';
import { AnunciosService } from 'src/api/anuncios/anuncios.service';
import { LojasModel } from 'src/models/lojas.model';
import { AnunciosModel } from 'src/models/anuncios.model';

@Injectable()
export class ProdutosService {
    constructor(
        private readonly produtosRepository: ProdutosRepository,
        private readonly lojasService: LojasService,
        private readonly anunciosService: AnunciosService,
    ) {}

    async getAllProducts(): Promise<ProdutosModel[]> {
        return this.produtosRepository.getAllProducts();
    }

    async getProductByCodBarra(codBarra: string): Promise<ProdutosModel | null> {
        return this.produtosRepository.getByCodBarra(codBarra);
    }

    async getManyProductsByCodBarra(arrCodBarra: string[]): Promise<ProdutosModel[]> {
        return this.produtosRepository.getManyByCodBarra(arrCodBarra);
    }

    async createProduct(product: ProdutosModel): Promise<[ProdutosModel, boolean]> {
        return this.produtosRepository.create(product);
    }

    async updateProduct(codBarra: string, product: ProdutosModel): Promise<ProdutosModel> {
        return this.produtosRepository.update(codBarra, product);
    }

    async deleteProduct(codBarra: string): Promise<number> {
        return this.produtosRepository.delete(codBarra);
    }

    async searchProducts(query: string): Promise<ProdutosModel[]> {
        return this.produtosRepository.searchProducts(query);
    }

    /**
     * @todo FIX!!!
     */
    async handleSearchResults({
        classifieds,
        products,
        stores,
    }: ISearchProductSefazParsedReturn): Promise<void> {
        for (const store of stores) {
            await this.lojasService
                .createStore({
                    ...store,
                } as LojasModel)
                .catch((e) => {
                    console.error(e);
                    /* noop */
                });
        }

        for (const product of products) {
            await this.createProduct({
                ...product,
            } as ProdutosModel).catch((e) => {
                console.error(e);
                /* noop */
            });
        }

        /** @todo UPDATE! */
        for (const classified of classifieds) {
            await this.anunciosService
                .createClassified({
                    ...classified,
                } as AnunciosModel)
                .catch((e) => {
                    console.error(e);
                    /* noop */
                });
        }
    }
}

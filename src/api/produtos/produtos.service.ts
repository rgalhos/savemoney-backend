import { Injectable } from '@nestjs/common';
import { ProdutosRepository } from './produtos.repository';
import { ProdutosModel } from 'src/models/produtos.model';

@Injectable()
export class ProdutosService {
    constructor(private readonly produtosRepository: ProdutosRepository) {}

    async getAllProducts(): Promise<ProdutosModel[]> {
        return this.produtosRepository.getAllProducts();
    }

    async getProductByCodBarra(codBarra: string): Promise<ProdutosModel | null> {
        return this.produtosRepository.getByCodBarra(codBarra);
    }

    async createProduct(product: ProdutosModel): Promise<ProdutosModel> {
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
}

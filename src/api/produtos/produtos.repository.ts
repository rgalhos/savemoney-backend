import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { ProdutosModel } from 'src/models/produtos.model';

type ProdutosWhereParams = WhereParams<ProdutosModel>;

@Injectable()
export class ProdutosRepository {
    constructor(
        @InjectModel(ProdutosModel)
        private produtosModel: typeof ProdutosModel,
    ) {}

    async getAllProducts(): Promise<ProdutosModel[]> {
        return await this.produtosModel.findAll();
    }

    async getByCodBarra(codBarra: string): Promise<ProdutosModel | null> {
        return await this.produtosModel.findByPk(codBarra);
    }

    async getManyByCodBarra(arrCodBarras: string[]): Promise<ProdutosModel[]> {
        return await this.produtosModel.findAll({
            where: {
                codBarra: arrCodBarras,
            } as ProdutosWhereParams,
            raw: true,
        });
    }

    async create(product: ProdutosModel): Promise<[ProdutosModel, boolean]> {
        return await this.produtosModel.findOrCreate({
            where: {
                codBarra: product.codBarra,
            } as ProdutosWhereParams,
            defaults: {
                ...product,
            },
        });
    }

    async update(codBarra: string, product: ProdutosModel): Promise<ProdutosModel> {
        const existing = await this.produtosModel.findByPk(codBarra);

        if (!existing) throw new Error('does not exist');

        return existing.update(product);
    }

    async delete(codBarra: string): Promise<number> {
        return this.produtosModel.destroy({
            where: {
                codBarra: codBarra,
            } as ProdutosWhereParams,
        });
    }

    async searchProducts(query: string): Promise<ProdutosModel[]> {
        return await this.produtosModel.findAll({
            where: {
                nome: {
                    [Op.like]: `%${query}%`,
                },
            },
        });
    }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { ProdutosModel } from 'src/models/produtos.model';

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

    async create(product: ProdutosModel): Promise<ProdutosModel> {
        return await this.produtosModel.create({
            ...product,
        });
    }

    async update(id: string, product: ProdutosModel): Promise<ProdutosModel> {
        const existing = await this.produtosModel.findByPk(id);

        if (!existing) throw new Error('does not exist');

        return existing.update(product);
    }

    async delete(id: string): Promise<number> {
        return this.produtosModel.destroy({
            where: {
                codBarra: id,
            },
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

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AnunciosModel, RawAnunciosModel } from 'src/models/anuncios.model';
// import { LojasModel } from 'src/models/lojas.model';
// import { ProdutosModel } from 'src/models/produtos.model';

type AnunciosWhereParams = WhereParams<AnunciosModel, { id: string }>;
type AnunciosFieldParams = FieldParams<AnunciosModel>;

@Injectable()
export class AnunciosRepository {
    constructor(
        @InjectModel(AnunciosModel)
        private anunciosModel: typeof AnunciosModel,
    ) {}

    async getAllClassifieds(): Promise<AnunciosModel[]> {
        return await this.anunciosModel.findAll();
    }

    async getById(id: string): Promise<AnunciosModel | null> {
        return await this.anunciosModel.findByPk(id);
    }

    async getByCodBarra(codBarra: string): Promise<AnunciosModel[]> {
        return await this.anunciosModel.findAll({
            where: {
                produtoId: codBarra,
            } as AnunciosWhereParams,
        });
    }

    async getByLoja(cnpj: string): Promise<AnunciosModel[]> {
        return await this.anunciosModel.findAll({
            where: {
                lojaId: cnpj,
            } as AnunciosWhereParams,
        });
    }

    /**
     * @todo
     */
    async getAndJoinTables(arrCodBarras: string[]): Promise<any> {
        const anuncios = await this.anunciosModel.findAll({
            where: {
                produtoId: arrCodBarras,
            } as AnunciosWhereParams,
        });

        const idsProdutos = anuncios.map((x: RawAnunciosModel) => x.produtoId);
    }

    /**
     * @todo
     */
    async create(classified: AnunciosModel): Promise<[AnunciosModel, boolean]> {
        const [anuncio, created] = await this.anunciosModel.findOrCreate({
            where: {
                produtoId: classified.produtoId,
                lojaId: classified.lojaId,
            } as AnunciosWhereParams,
            defaults: {
                ...classified,
            },
        });

        if (!created) {
            await this.anunciosModel.update(classified, {
                where: {
                    produtoId: classified.produtoId,
                    lojaId: classified.lojaId,
                } as AnunciosWhereParams,
                fields: ['preco'] as AnunciosFieldParams,
            });
        }

        return [anuncio, created];
    }

    async update(id: string, classified: AnunciosModel): Promise<AnunciosModel> {
        const existing = await this.anunciosModel.findByPk(id);

        if (!existing) throw new Error('does not exist');

        return existing.update(classified);
    }

    async delete(id: string): Promise<number> {
        return this.anunciosModel.destroy({
            where: {
                id: id,
            } as AnunciosWhereParams,
        });
    }
}

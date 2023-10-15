import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AnunciosModel } from 'src/models/anuncios.model';

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

    /**
     * @todo
     */
    async create(classified: AnunciosModel): Promise<[AnunciosModel, boolean]> {
        const [anuncio, created] = await this.anunciosModel.findOrCreate({
            where: {
                produto: classified.produto,
                loja: classified.loja,
            },
            defaults: {
                ...classified,
            },
        });

        if (!created) {
            await this.anunciosModel.update(classified, {
                where: {
                    produto: classified.produto,
                    loja: classified.loja,
                },
                fields: ['preco'],
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
            },
        });
    }
}

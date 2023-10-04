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

    async create(classified: AnunciosModel): Promise<AnunciosModel> {
        return await this.anunciosModel.create({
            ...classified,
        });
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

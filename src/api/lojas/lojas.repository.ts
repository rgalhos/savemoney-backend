import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LojasModel } from 'src/models/lojas.model';

@Injectable()
export class LojasRepository {
    constructor(
        @InjectModel(LojasModel)
        private lojasModel: typeof LojasModel,
    ) {}

    async getAllStores(): Promise<LojasModel[]> {
        return await this.lojasModel.findAll();
    }

    async getByCNPJ(cnpj: string): Promise<LojasModel | null> {
        return await this.lojasModel.findByPk(cnpj);
    }

    async create(store: LojasModel): Promise<LojasModel> {
        return await this.lojasModel.create({
            ...store,
        });
    }

    async update(cnpj: string, store: LojasModel): Promise<LojasModel> {
        const existing = await this.lojasModel.findByPk(cnpj);

        if (!existing) throw new Error('does not exist');

        return existing.update(store);
    }

    async delete(cnpj: string): Promise<number> {
        return this.lojasModel.destroy({
            where: {
                cnpj: cnpj,
            },
        });
    }
}

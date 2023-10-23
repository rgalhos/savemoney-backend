import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LojasModel } from 'src/models/lojas.model';

type LojasWhereParams = WhereParams<LojasRepository>;

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

    async getManyByCNPJ(cnpjList: string[]): Promise<LojasModel[]> {
        return await this.lojasModel.findAll({
            where: {
                cnpj: cnpjList,
            } as LojasWhereParams,
            raw: true,
        });
    }

    async create(store: LojasModel): Promise<[LojasModel, boolean]> {
        return await this.lojasModel.findOrCreate({
            where: {
                cnpj: store.cnpj,
            } as LojasWhereParams,
            defaults: {
                ...store,
            },
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
            } as LojasWhereParams,
        });
    }
}

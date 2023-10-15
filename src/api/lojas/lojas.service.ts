import { Injectable } from '@nestjs/common';
import { LojasRepository } from 'src/api/lojas/lojas.repository';
import { LojasModel } from 'src/models/lojas.model';

@Injectable()
export class LojasService {
    constructor(private readonly lojasRepository: LojasRepository) {}

    async getAllStores(): Promise<LojasModel[]> {
        return this.lojasRepository.getAllStores();
    }

    async getStoreByCNPJ(cnpj: string): Promise<LojasModel | null> {
        return this.lojasRepository.getByCNPJ(cnpj);
    }

    async createStore(store: LojasModel): Promise<[LojasModel, boolean]> {
        return this.lojasRepository.create(store);
    }

    async updateStore(cnpj: string, store: LojasModel): Promise<LojasModel> {
        return this.lojasRepository.update(cnpj, store);
    }

    async deleteStore(cnpj: string): Promise<number> {
        return this.lojasRepository.delete(cnpj);
    }
}

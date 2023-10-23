import { Injectable } from '@nestjs/common';
import { AnunciosRepository } from 'src/api/anuncios/anuncios.repository';
import { AnunciosModel } from 'src/models/anuncios.model';

@Injectable()
export class AnunciosService {
    constructor(private readonly anunciosRepository: AnunciosRepository) {}

    async getAllClassifieds(): Promise<AnunciosModel[]> {
        return this.anunciosRepository.getAllClassifieds();
    }

    async getClassifiedByCodBarra(codBarra: string): Promise<AnunciosModel[]> {
        return this.anunciosRepository.getByCodBarra(codBarra);
    }

    async getClassifiedByLoja(cnpj: string): Promise<AnunciosModel[]> {
        return this.anunciosRepository.getByLoja(cnpj);
    }

    async getClassifiedsAndJoinTables(arrCodBarra: string[]): Promise<any> {
        return this.anunciosRepository.getAndJoinTables(arrCodBarra);
    }

    async createClassified(classified: AnunciosModel): Promise<[AnunciosModel, boolean]> {
        return this.anunciosRepository.create(classified);
    }

    async updateClassified(codBarra: string, classified: AnunciosModel): Promise<AnunciosModel> {
        return this.anunciosRepository.update(codBarra, classified);
    }

    async deleteClassified(codBarra: string): Promise<number> {
        return this.anunciosRepository.delete(codBarra);
    }
}

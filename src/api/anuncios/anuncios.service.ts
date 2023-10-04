import { Injectable } from '@nestjs/common';
import type { AnunciosRepository } from 'src/api/anuncios/anuncios.repository';
import type { AnunciosModel } from 'src/models/anuncios.model';

@Injectable()
export class AnunciosService {
    constructor(private readonly anunciosRepository: AnunciosRepository) {}

    async getAllClassifieds(): Promise<AnunciosModel[]> {
        return this.anunciosRepository.getAllClassifieds();
    }

    async getClassifiedById(codBarra: string): Promise<AnunciosModel | null> {
        return this.anunciosRepository.getById(codBarra);
    }

    async createClassified(classified: AnunciosModel): Promise<AnunciosModel> {
        return this.anunciosRepository.create(classified);
    }

    async updateClassified(codBarra: string, classified: AnunciosModel): Promise<AnunciosModel> {
        return this.anunciosRepository.update(codBarra, classified);
    }

    async deleteClassified(codBarra: string): Promise<number> {
        return this.anunciosRepository.delete(codBarra);
    }
}
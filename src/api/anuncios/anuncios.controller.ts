import { Controller, Get, Param } from '@nestjs/common';
import { AnunciosService } from 'src/api/anuncios/anuncios.service';
import { AnunciosModel } from 'src/models/anuncios.model';

@Controller('anuncios')
export class AnunciosController {
    constructor(private readonly anunciosService: AnunciosService) {}

    @Get('/all')
    async getAllClassifieds(): Promise<AnunciosModel[]> {
        return this.anunciosService.getAllClassifieds();
    }

    @Get('/health')
    async health(): Promise<string> {
        return 'OK anuncios';
    }

    @Get('/byProduto/:codBarra')
    async getByCodBarra(@Param('codBarra') codBarra: string): Promise<AnunciosModel[]> {
        return this.anunciosService.getClassifiedByCodBarra(codBarra);
    }

    @Get('/byLoja/:cnpj')
    async getByLoja(@Param('cnpj') cnpj: string): Promise<AnunciosModel[]> {
        return this.anunciosService.getClassifiedByLoja(cnpj);
    }
}

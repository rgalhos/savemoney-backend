import { Controller, Get, Param } from '@nestjs/common';
import type { LojasService } from 'src/api/lojas/lojas.service';
import type { LojasModel } from 'src/models/lojas.model';

@Controller('lojas')
export class LojasController {
    constructor(private readonly lojasService: LojasService) {}

    @Get('/all')
    async getAllStores(): Promise<LojasModel[]> {
        return this.lojasService.getAllStores();
    }

    @Get('/health')
    async health(): Promise<string> {
        return 'OK lojas';
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<LojasModel | null> {
        return this.lojasService.getStoreByCNPJ(id);
    }
}

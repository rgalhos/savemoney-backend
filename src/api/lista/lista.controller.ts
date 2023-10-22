import { Controller, Get, Query } from '@nestjs/common';
import { ListaService } from './lista.service';

@Controller('lista')
export class ListaController {
    constructor(private readonly listaService: ListaService) {}

    @Get('/health')
    async health(): Promise<string> {
        return 'OK lista';
    }

    @Get('/')
    async buildShoppingList(
        @Query('codBarras') codBarras: string,
        @Query('latitude') latitude: string,
        @Query('longitude') longitude: string,
        @Query('raio') raio: string,
    ) {
        const arrCodBarra = codBarras?.split(',');

        if (!Array.isArray(arrCodBarra) || arrCodBarra.length === 0) {
            // return Promise.resolve({ error: true, message: 'requisição inválida' });
        }

        console.log('>>>>>>>>> ', { arrCodBarra, latitude, longitude, raio });

        return this.listaService.handleBuildShoppingList(arrCodBarra as string[]);
    }
}

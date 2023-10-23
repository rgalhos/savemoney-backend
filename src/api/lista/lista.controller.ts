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
        @Query('max') max: string,
    ) {
        const arrCodBarra = codBarras?.split(',');
        const maxListas = isNaN(Number(max)) ? 10 : Number(max);

        if (!Array.isArray(arrCodBarra) || arrCodBarra.length === 0) {
            return Promise.reject({ error: true, message: 'requisição inválida' });
        }

        console.log('>>>>>>>>> ', { arrCodBarra, latitude, longitude, raio });

        const listas = await this.listaService.handleBuildShoppingList(arrCodBarra as string[]);

        return listas.slice(0, maxListas);
    }
}

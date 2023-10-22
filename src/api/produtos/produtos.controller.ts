import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProdutosService } from 'src/api/produtos/produtos.service';
import { ProdutosModel } from 'src/models/produtos.model';
import {
    searchProductSefaz,
    type ISearchProductSefazParsedReturn,
} from 'src/infra/sefaz/search-product-sefaz';

@Controller('produtos')
export class ProdutosController {
    constructor(private readonly produtosService: ProdutosService) {}

    @Get('/all')
    async getAllProducts(): Promise<ProdutosModel[]> {
        return this.produtosService.getAllProducts();
    }

    @Get('/busca')
    async getByQuery(
        @Query('q') q: string,
        @Query('latitude') latitude: string,
        @Query('longitude') longitude: string,
        @Query('raio') raio: string,
    ): Promise<any> {
        if (!q) return [];

        const searchResult: ISearchProductSefazParsedReturn = await searchProductSefaz(q, {
            latitude,
            longitude,
            raio,
        });

        this.produtosService.handleSearchResults(searchResult);

        return searchResult.products;
    }

    @Get('/health')
    async health(): Promise<string> {
        return 'OK produtos';
    }

    @Get(':id')
    async getProductByCodBarra(@Param('id') id: string): Promise<ProdutosModel | null> {
        return this.produtosService.getProductByCodBarra(id);
    }
}

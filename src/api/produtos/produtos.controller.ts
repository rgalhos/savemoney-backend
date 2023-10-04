import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosModel } from 'src/models/produtos.model';
import { searchProductSefaz } from 'src/infra/sefaz/search-product-sefaz';

@Controller('produtos')
export class ProdutosController {
    constructor(private readonly produtosService: ProdutosService) {}

    @Get('/all')
    async getAllProducts(): Promise<ProdutosModel[]> {
        return this.produtosService.getAllProducts();
    }

    @Get('/busca')
    async getByQuery(@Query('q') q: string): Promise<any> {
        if (!q) return [];

        return searchProductSefaz(q);

        // return this.produtosService.searchProducts(q);
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

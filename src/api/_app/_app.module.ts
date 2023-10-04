import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
//#region _app
import { AppController } from './_app.controller';
import { AppService } from './_app.service';
//#endregion _app
//#region produtos
import { ProdutosController } from 'src/api/produtos/produtos.controller';
import { ProdutosRepository } from 'src/api/produtos/produtos.repository';
import { ProdutosModel } from 'src/models/produtos.model';
//#endregion produtos
import { LojasModel } from 'src/models/lojas.model';
import { AnunciosModel } from 'src/models/anuncios.model';
import { ProdutosService } from '../produtos/produtos.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            models: [ProdutosModel, LojasModel, AnunciosModel],
        }),
        SequelizeModule.forFeature([ProdutosModel]),
    ],
    controllers: [AppController, ProdutosController],
    providers: [AppService, ProdutosService, ProdutosRepository],
})
export class AppModule {}

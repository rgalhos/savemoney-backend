import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
//#region _app
import { AppController } from 'src/api/_app/_app.controller';
import { AppService } from 'src/api/_app/_app.service';
//#endregion _app
//#region produtos
import { ProdutosController } from 'src/api/produtos/produtos.controller';
import { ProdutosRepository } from 'src/api/produtos/produtos.repository';
import { ProdutosService } from 'src/api/produtos/produtos.service';
import { ProdutosModel } from 'src/models/produtos.model';
//#endregion produtos
//#region lojas
import { LojasController } from 'src/api/lojas/lojas.controller';
import { LojasRepository } from 'src/api/lojas/lojas.repository';
import { LojasService } from 'src/api/lojas/lojas.service';
import { LojasModel } from 'src/models/lojas.model';
//#endregion lojas
//#region anuncios
import { AnunciosController } from 'src/api/anuncios/anuncios.controller';
import { AnunciosRepository } from 'src/api/anuncios/anuncios.repository';
import { AnunciosService } from 'src/api/anuncios/anuncios.service';
import { AnunciosModel } from 'src/models/anuncios.model';
//#endregion anuncios

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            // envFilePath:
            //     ((process.env.NODE_ENV !== 'production' ? process.env.NODE_ENV : '') || '') +
            // '.env',
            envFilePath: '.env',
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: typeof process.env.DB_PASS !== 'string' ? '' : process.env.DB_PASS,
            database: process.env.DB_NAME,
            models: [ProdutosModel, LojasModel, AnunciosModel],
        }),
        SequelizeModule.forFeature([ProdutosModel, LojasModel, AnunciosModel]),
    ],
    controllers: [AppController, ProdutosController, LojasController, AnunciosController],
    providers: [
        // services
        AppService,
        ProdutosService,
        LojasService,
        AnunciosService,

        // repositories
        ProdutosRepository,
        LojasRepository,
        AnunciosRepository,
    ],
})
export class AppModule {}

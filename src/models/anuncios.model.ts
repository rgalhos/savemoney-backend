import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ProdutosModel } from 'src/models/produtos.model';
import { LojasModel } from 'src/models/lojas.model';

@Table({
    tableName: 'anuncios',
    freezeTableName: true,
    underscored: false,
})
export class AnunciosModel extends Model {
    @ForeignKey(() => ProdutosModel)
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    produto: string;

    @ForeignKey(() => LojasModel)
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: false,
    })
    loja: string;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false,
        unique: false,
    })
    preco: number;
}

export type RawAnunciosModel = RawModel<AnunciosModel>;

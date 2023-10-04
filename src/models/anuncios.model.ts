import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ProdutosModel } from 'src/models/produtos.model';
import { LojasModel } from 'src/models/lojas.model';

@Table({
    tableName: 'produtos',
    freezeTableName: true,
    underscored: false,
})
export class AnunciosModel extends Model {
    @ForeignKey(() => ProdutosModel)
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    })
    produto: string;

    @ForeignKey(() => LojasModel)
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
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

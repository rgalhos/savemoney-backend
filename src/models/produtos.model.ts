import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
    tableName: 'produtos',
    freezeTableName: true,
    underscored: false,
})
export class ProdutosModel extends Model {
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    })
    codBarra: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: false,
    })
    nome: string;
}

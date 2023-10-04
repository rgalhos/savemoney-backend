import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
    tableName: 'produtos',
    freezeTableName: true,
    underscored: false,
})
export class LojasModel extends Model {
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    })
    cnpj: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: false,
    })
    nome: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        unique: false,
    })
    endereco: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        unique: false,
    })
    cep: string;

    @Column({
        type: DataType.DOUBLE,
        allowNull: true,
        unique: false,
    })
    latitude: number;

    @Column({
        type: DataType.DOUBLE,
        allowNull: true,
        unique: false,
    })
    longitude: number;
}

export type RawLojasModel = RawModel<LojasModel>;

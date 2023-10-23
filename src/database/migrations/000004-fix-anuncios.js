'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn('anuncios', 'produto', {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            unique: false, // <- change
            primaryKey: false, // <- change
            references: {
                model: 'produtos',
                key: 'codBarra',
            },
        });

        await queryInterface.changeColumn('anuncios', 'loja', {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            unique: false, // <- change
            primaryKey: false, // <- change
            references: {
                model: 'lojas',
                key: 'cnpj',
            },
        });
    },
};

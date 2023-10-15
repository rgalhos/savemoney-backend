'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ALIAS_id, ALIAS_createdAt, ALIAS_updatedAt } = require('../aliases');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

        await queryInterface.createTable('anuncios', {
            ...ALIAS_id,
            produto: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: false,
                references: {
                    model: 'produtos',
                    key: 'codBarra',
                },
            },
            loja: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: false,
                references: {
                    model: 'lojas',
                    key: 'cnpj',
                },
            },
            preco: {
                type: Sequelize.DOUBLE,
                allowNull: false,
                unique: false,
            },
            ...ALIAS_createdAt,
            ...ALIAS_updatedAt,
        });
    },
};

'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ALIAS_createdAt, ALIAS_updatedAt } = require('../aliases');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('lojas', {
            cnpj: {
                type: Sequelize.STRING,
                primaryKey: true,
                allowNull: false,
                unique: true,
            },
            nome: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: false,
            },
            endereco: {
                type: Sequelize.STRING,
                allowNull: true,
                unique: false,
            },
            cep: {
                type: Sequelize.STRING,
                allowNull: true,
                unique: false,
            },
            latitude: {
                type: Sequelize.DOUBLE,
                allowNull: true,
                unique: false,
            },
            longitude: {
                type: Sequelize.DOUBLE,
                allowNull: true,
                unique: false,
            },
            ...ALIAS_createdAt,
            ...ALIAS_updatedAt,
        });
    },
};

'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ALIAS_createdAt, ALIAS_updatedAt } = require('../aliases');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('produtos', {
            codBarra: {
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
            ...ALIAS_createdAt,
            ...ALIAS_updatedAt,
        });
    },
};

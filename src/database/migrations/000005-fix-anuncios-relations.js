'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        await queryInterface.renameColumn('anuncios', 'produto', 'produtoId');
        await queryInterface.renameColumn('anuncios', 'loja', 'lojaId');
    },
};

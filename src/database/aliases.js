// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('sequelize');

const ALIAS_id = {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
};

const ALIAS_createdAt = {
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
    },
};

const ALIAS_updatedAt = {
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
    },
};

module.exports = {
    ALIAS_id,
    ALIAS_createdAt,
    ALIAS_updatedAt,
};

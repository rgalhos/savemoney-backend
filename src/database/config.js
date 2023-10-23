// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

module.exports = {
    username: process.env.DB_USER,
    password: typeof process.env.DB_PASS !== 'string' ? '' : process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    define: {
        timestamps: true,
    },
};

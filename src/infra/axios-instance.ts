import axios from 'axios';

const ins = axios.create();

ins.interceptors.request.use(
    (config) => {
        config.headers.AppToken = process.env.TOKEN_SEFAZ;

        return config;
    },
    (error) => Promise.reject(error),
);

export default ins;

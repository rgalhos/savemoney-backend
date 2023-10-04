export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN_SEFAZ: string;
            DB_HOST: string;
            /** @description Lembrar de transformar para number */
            DB_PORT: string;
            DB_USER: string;
            DB_PASS: string;
            DB_NAME: string;
            /** @description Possivelmente deixar mais flexível */
            CODIGO_IBGE: string;
        }
    }
}

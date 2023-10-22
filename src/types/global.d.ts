import type { Model } from 'sequelize-typescript';

export {};

declare global {
    type Dictionary<T> = Record<string, T>;

    type UnknownDictionary = Record<string, any>;

    type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
        {
            [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
        }[Keys];

    type RawModel<T> = Omit<T, keyof Model> & {
        createdAt?: Date | any;
        updatedAt?: Date | any;
    };

    type WhereParams<T, K = any> = { [J in keyof Partial<RawModel<T> & K>]: any };

    type FieldParams<T> = Array<keyof RawModel<T>>;
}

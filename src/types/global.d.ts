export {};

declare global {
    type Dictionary<T> = { [key: string]: T };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type UnknownDictionary = { [key: string]: any };

    type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
        {
            [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
        }[Keys];
}

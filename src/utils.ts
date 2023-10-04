export function wait(ms: number): Promise<void> {
    return new Promise((r) => setTimeout(r, ms));
}

export function project<T>(
    original: T,
    fields: { [field in keyof T]: 0 | 1 | boolean },
): UnknownDictionary;
export function project<T>(original: T, fields: (keyof T)[]): UnknownDictionary;
export function project<T extends Dictionary<keyof T>>(
    original: T,
    fields: (keyof T)[] | { [field in keyof T]: 0 | 1 | boolean },
): UnknownDictionary {
    const projected: UnknownDictionary = {};

    if (Array.isArray(fields)) {
        for (const field of fields) {
            projected[field as string] = original[field];
        }
    } else {
        for (const [field, project] of Object.entries(fields)) {
            if (project) {
                projected[field] = original[field];
            }
        }
    }

    return projected;
}

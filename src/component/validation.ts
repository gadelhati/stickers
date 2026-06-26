export type ValidationRules<T> = {
    readonly [K in keyof Required<T>]: 
        T[K] extends object ? ValidationRules<T[K]> : RegExp
}

export function validate<T extends object>(
    data: T,
    rules: ValidationRules<T>
): Partial<Record<string, string>> {
    const errors: Partial<Record<string, string>> = {}

    for (const key in rules) {
        const rule = rules[key as keyof T]
        const value = data[key as keyof T]

        if (rule instanceof RegExp) {
            if (!rule.test(String(value))) {
                errors[key] = `Campo inválido: ${key}`
            }
        } else if (typeof rule === 'object' && typeof value === 'object' && value !== null) {
            const nestedErrors = validate(value as object, rule as ValidationRules<object>)
            for (const nestedKey in nestedErrors) {
                errors[`${key}.${nestedKey}`] = nestedErrors[nestedKey]!
            }
        }
    }

    return errors
}
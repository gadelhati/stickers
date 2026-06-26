import { type ValidationRules } from "./validation"

export interface Country {
    readonly id: string,
    code: string,
    name: string,
}
export const initialCountryValidation: ValidationRules<Country> = {
    id: /^[a-zA-Z0-9]+$/,
    code: /^[a-zA-Z0-9]+$/,
    name: /^[a-zA-Z0-9 ]+$/,
}
export const initialCountry: Country = {
    id: '001',
    code: 'BRA',
    name: 'Brasil',
}
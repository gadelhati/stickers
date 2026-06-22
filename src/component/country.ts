export interface Country {
    readonly id: string,
    code: string,
    name: string,
}
export interface CountryValidation {
    readonly id: string,
    readonly code: string,
    readonly name: string,
}
export const initialCountryValidation: CountryValidation = {
    id: `^[a-zA-Z0-9]+$`,
    code: `^[a-zA-Z0-9]+$`,
    name: `^[a-zA-Z0-9]+$`,
}
export const initialCountry: Country = {
    id: '001',
    code: 'BRA',
    name: 'Brasil',
}
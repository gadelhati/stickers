import { initialCountry, type Country } from "./country"
import { initialTeam, type Team } from "./team"
import { type ValidationRules } from "./validation"

export interface Character {
    readonly id: string,
    name: string,
    age: number,
    height: number,
    weight: number,
    country: Country,
    team: Team,
    photo?: string,
}
export const initialCharacterValidation: ValidationRules<Character> = {
    id: /^[a-zA-Z0-9]+$/,
    name: /^[a-zA-Z0-9 ]+$/,
    age: /^[0-9]+$/,
    height: /^[0-9]+(\.[0-9]+)?$/,
    weight: /^[0-9]+(\.[0-9]+)?$/,
    country: {
        id:   /^[a-zA-Z0-9]+$/,
        code: /^[a-zA-Z0-9]+$/,
        name: /^[a-zA-Z0-9 ]+$/,
    },
    team: {
        id:       /^[a-zA-Z0-9]+$/,
        name:     /^[a-zA-Z0-9 ]+$/,
        colorOne: /^#[0-9A-Fa-f]{6}$/,
        colorTwo: /^#[0-9A-Fa-f]{6}$/,
    },
    photo: /^.*$/,
}
export const initialCharacter: Character = {
    id: '001',
    name: 'Gael Gadelha',
    age: 9,
    height: 1.40,
    weight: 50,
    country: initialCountry,
    team: initialTeam,
    photo: '',
}
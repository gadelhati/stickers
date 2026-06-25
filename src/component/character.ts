import { initialCountry, type Country } from "./country"
import { initialTeam, type Team } from "./team"

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
export interface CharacterValidation {
    readonly id: string,
    readonly name: string,
    readonly age: string,
    readonly height: string,
    readonly weight: string,
    readonly country: Country,
    readonly team: Team,
    readonly photo?: string,
}
export const initialCharacterValidation: CharacterValidation = {
    id: `^[a-zA-Z0-9]+$`,
    name: `^[a-zA-Z0-9]+$`,
    age: `^[0-9]+$`,
    height: `^[0-9]+$`,
    weight: `^[0-9]+$`,
    country: initialCountry,
    team: initialTeam,
    photo: `^[a-zA-Z0-9]+$`,
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
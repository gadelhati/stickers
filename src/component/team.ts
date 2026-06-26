import { type ValidationRules } from "./validation"

export interface Team {
    readonly id: string,
    name: string,
    colorOne: string,
    colorTwo: string,
}
export const initialTeamValidation: ValidationRules<Team> = {
    id: /^[a-zA-Z0-9]+$/,
    name: /^[a-zA-Z0-9 ]+$/,
    colorOne: /^#[0-9A-Fa-f]{6}$/,
    colorTwo: /^#[0-9A-Fa-f]{6}$/,
}
export const initialTeam: Team = {
    id: '001',
    name: 'Flamengo',
    colorOne: '#449966',
    colorTwo: '#F9DF43',
}
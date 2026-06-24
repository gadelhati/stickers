export interface Team {
    readonly id: string,
    name: string,
    colorOne: string,
    colorTwo: string,
}
export interface TeamValidation {
    readonly id: string,
    readonly name: string,
    readonly colorOne: string,
    readonly colorTwo: string,
}
export const initialTeamValidation: TeamValidation = {
    id: `^[a-zA-Z0-9]+$`,
    name: `^[a-zA-Z0-9]+$`,
    colorOne: `^#[0-9A-Fa-f]{6}$`,
    colorTwo: `^#[0-9A-Fa-f]{6}$`,
}
export const initialTeam: Team = {
    id: '001',
    name: 'Flamengo',
    colorOne: '#449966',
    colorTwo: '#F9DF43',
}